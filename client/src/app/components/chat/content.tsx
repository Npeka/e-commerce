"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Form } from "antd";
import { useSearchParams } from "next/navigation";

const ChatContent: React.FC = () => {
    const [messages, setMessages] = useState<
        { sender: string; text: string }[]
    >([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef<WebSocket | null>(null);
    const params = useSearchParams();

    const userID = params.get("user"); // Lấy userID từ query string
    const recipientID = userID === "1" ? "2" : "1"; // Giả sử chat giữa user 1 và user 2

    const socket = new WebSocket(`ws://localhost:8080/ws?user=${userID}`);

    // useEffect(() => {
    //   if (!userID) {
    //     console.error("User ID is missing");
    //     return;
    //   }

    // Kết nối WebSocket
    socketRef.current = socket;

    socket.onopen = () => {
        console.log("WebSocket connected");
    };

    socket.onclose = () => {
        console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    // return () => {
    //   socket.close(); // Đóng WebSocket khi unmount
    // };
    // }, [userID]);

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log("Received message:", data); // Add logging to see the message
            if (data.sender && data.message) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: data.sender, text: data.message },
                ]);
            }
        } catch (error) {
            console.error("Error parsing message data:", error);
        }
    };

    const sendMessage = () => {
        if (newMessage && socketRef.current) {
            const message = {
                sender: userID,
                recipient: recipientID,
                message: newMessage,
            };

            socketRef.current.send(JSON.stringify(message)); // Gửi tin nhắn qua WebSocket
            console.log("Sent message:", JSON.stringify(message));
            setMessages((prevMessages: any) => [
                ...prevMessages,
                { sender: userID, text: newMessage },
            ]); // Hiển thị tin nhắn trên giao diện
            setNewMessage(""); // Xóa nội dung input
        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Chat Messages */}
            <div className="max-h-full flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2`}>
                        <div className="content-stretch">
                            <div
                                className={`min-w-0 max-w-[50%] text-wrap break-words rounded-lg px-4 py-2 ${
                                    msg.sender === userID
                                        ? "float-right bg-blue-500 text-white"
                                        : "float-left bg-gray-200 text-black"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <Form
                className="!gap-2"
                layout="inline"
                size="large"
                onFinish={sendMessage}
            >
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="mr-2 flex-1"
                />
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default ChatContent;

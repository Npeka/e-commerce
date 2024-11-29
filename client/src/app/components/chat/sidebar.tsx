"use client";
import React from "react";
import { List, Avatar } from "antd";

type ChatSidebarProps = {
    selectedChat: string | null;
    setSelectedChat: (chatId: string) => void;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    selectedChat,
    setSelectedChat,
}) => {
    const chats = [
        { id: "shop1", name: "Shop A", lastMessage: "Hello, how can I help?" },
        { id: "shop2", name: "Shop B", lastMessage: "Your order is ready!" },
        {
            id: "shop3",
            name: "Shop C",
            lastMessage: "Can you confirm the details?",
        },
        {
            id: "shop4",
            name: "Shop D",
            lastMessage: "Thank you for your purchase!",
        },
        {
            id: "shop5",
            name: "Shop E",
            lastMessage: "We have a special offer for you.",
        },
        {
            id: "shop6",
            name: "Shop F",
            lastMessage: "Your item has been shipped.",
        },
        {
            id: "shop7",
            name: "Shop G",
            lastMessage: "Can I assist you with anything else?",
        },
        {
            id: "shop8",
            name: "Shop H",
            lastMessage: "We have received your return.",
        },
        {
            id: "shop9",
            name: "Shop I",
            lastMessage: "Your refund has been processed.",
        },
        {
            id: "shop10",
            name: "Shop J",
            lastMessage: "New arrivals are now available.",
        },
    ];

    return (
        <div className="h-full max-h-full overflow-y-auto p-4">
            <h2 className="mb-4 text-xl font-semibold">Chats</h2>
            <List
                itemLayout="horizontal"
                dataSource={chats}
                renderItem={(item) => (
                    <List.Item
                        className={`!cursor-pointer !text-white ${
                            selectedChat === item.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setSelectedChat(item.id)}
                    >
                        <List.Item.Meta
                            className="!items-center"
                            avatar={
                                <Avatar size="large">{item.name[0]}</Avatar>
                            }
                            title={item.name}
                            description={item.lastMessage}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ChatSidebar;

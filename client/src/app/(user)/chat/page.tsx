"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import ChatSidebar from "@/components/chat/sidebar";
import ChatContent from "@/components/chat/content";

const { Sider, Content } = Layout;

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    return (
        <Layout className="h-full">
            {/* Sidebar */}
            <Sider width={300} className="border-r bg-white" theme="light">
                <ChatSidebar
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
            </Sider>

            {/* Main Chat Content */}
            <Content className="ml-4">
                <ChatContent selectedChat={selectedChat} />
            </Content>
        </Layout>
    );
}

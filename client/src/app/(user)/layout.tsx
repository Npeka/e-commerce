"use client";
import { Layout, Row, Col } from "antd";
import { Header, Sidebar, Footer } from "@/ui/common";

const { Content, Sider } = Layout;

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Layout className="!max-h-screen !min-h-screen overflow-hidden">
            <Header />
            <Layout hasSider>
                <Sider width={240} theme="light">
                    <Sidebar />
                </Sider>

                <Layout className="">
                    <Content className="!min-h-full !overflow-y-auto p-4">
                        {children}
                    </Content>

                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
}

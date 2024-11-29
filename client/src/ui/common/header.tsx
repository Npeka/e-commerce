"use client";
import Link from "next/link";
import { Flex, Layout, Menu, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

export const Header = () => (
  <AntdHeader>
    <Flex justify="space-between" align="center">
      <Title className="!m-0 !text-white" level={2}>
        E-commerce
      </Title>

      <Menu className="flex items-center" mode="horizontal" theme="dark">
        <Menu.Item key="sign-in">
          <Link href="/sign-in">Sign In</Link>
        </Menu.Item>

        <Menu.Item key="sign-up">
          <Link href="/sign-up">Sign Up</Link>
        </Menu.Item>

        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link href="/cart">Cart</Link>
        </Menu.Item>
      </Menu>
    </Flex>
  </AntdHeader>
);

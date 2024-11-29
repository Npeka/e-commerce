"use client";
import { Menu } from "antd";
import {
  HomeOutlined,
  ShopOutlined,
  TagOutlined,
  UserOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const Sidebar = () => (
  <Menu defaultSelectedKeys={["1"]} mode="inline">
    <Menu.Item key="1" icon={<HomeOutlined />}>
      <Link href="/">Home</Link>
    </Menu.Item>

    <Menu.Item key="2" icon={<ShopOutlined />}>
      <Link href="/products">Products</Link>
    </Menu.Item>

    <Menu.Item key="3" icon={<TagOutlined />}>
      <Link href="/offers">Offers</Link>
    </Menu.Item>

    <Menu.Item key="4" icon={<UserOutlined />}>
      <Link href="/user/profile">Profile</Link>
    </Menu.Item>

    <Menu.Item key="8" icon={<UserOutlined />}>
      <Link href="/user/payment">Payment</Link>
    </Menu.Item>

    {/* Mục My Shop */}
    <Menu.SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="My Shop">
      <Menu.Item key="5">
        <Link href="/shop/register">Register My Shop</Link>
      </Menu.Item>

      <Menu.Item key="6">
        <Link href="/shop/dashboard">Dashboard</Link>
      </Menu.Item>

      <Menu.Item key="7">
        <Link href="/shop/products">Manage Products</Link>
      </Menu.Item>

      <Menu.Item key="8">
        <Link href="/shop/orders">Manage Orders</Link>
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

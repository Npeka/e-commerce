"use client";

import React, { useState } from "react";
import { Table, InputNumber, Button, Row, Col, Card, Typography } from "antd";
import Link from "next/link";

const { Text } = Typography;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "iPhone 13",
      price: 999,
      quantity: 1,
      image: "/images/iphone13.jpg",
    },
    {
      id: "2",
      name: "Nike Air Max 270",
      price: 150,
      quantity: 2,
      image: "/images/nike-air-max-270.jpg",
    },
  ]);

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total cost
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt={record.name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => updateQuantity(record.id, value || 1)}
        />
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_: any, record: any) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => removeItem(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Cart</h1>

      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Row justify="end" style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Text strong>Subtotal:</Text>
              <Text>${calculateTotal().toFixed(2)}</Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Text strong>Tax (10%):</Text>
              <Text>${(calculateTotal() * 0.1).toFixed(2)}</Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Text strong>Total:</Text>
              <Text>${(calculateTotal() * 1.1).toFixed(2)}</Text>
            </div>
            <Button type="primary" block>
              <Link href="checkout">Proceed to Checkout</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

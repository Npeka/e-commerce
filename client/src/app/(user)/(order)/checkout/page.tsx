"use client";

import React from "react";
import { Card, Button, List, Typography, Row, Col } from "antd";
import Link from "next/link";

const { Text, Title } = Typography;

export default function CheckoutPage() {
  const orderItems = [
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
  ];

  const calculateTotal = () =>
    orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Title level={2}>Order Confirmation</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          {/* Order Details */}
          <Card title="Order Summary">
            <List
              itemLayout="horizontal"
              dataSource={orderItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    }
                    title={item.name}
                    description={`Price: $${item.price.toFixed(2)} | Quantity: ${item.quantity}`}
                  />
                  <div>
                    <Text strong>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          {/* Order Summary */}
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
              <Link href="success">Confirm Order</Link>
            </Button>

            <Button block style={{ marginTop: "10px" }}>
              <Link href="/cart">Back to Cart</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

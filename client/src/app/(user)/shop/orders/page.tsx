"use client";
import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>([]);

  // Mock data for orders
  useEffect(() => {
    const mockOrders = [
      {
        id: "1",
        customer: "John Doe",
        status: "Pending",
        total: 150,
        date: "2024-11-19",
      },
      {
        id: "2",
        customer: "Jane Smith",
        status: "Completed",
        total: 320,
        date: "2024-11-18",
      },
      {
        id: "3",
        customer: "Alice Johnson",
        status: "Cancelled",
        total: 80,
        date: "2024-11-17",
      },
    ];
    setOrders(mockOrders);
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        let color =
          status === "Completed"
            ? "green"
            : status === "Cancelled"
              ? "red"
              : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Total ($)",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="default">View</Button>
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Orders</h2>
      <Table
        dataSource={orders.map((order: any) => ({
          ...order,
          key: order.id,
        }))}
        columns={columns}
      />
    </div>
  );
};

export default OrdersPage;

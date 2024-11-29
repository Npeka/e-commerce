"use client";

import React from "react";
import { Card, Row, Col, Statistic, Table, Progress } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const DashboardPage = () => {
  const recentOrders = [
    {
      key: "1",
      id: "ORD001",
      customer: "John Doe",
      total: "$150",
      status: "Pending",
    },
    {
      key: "2",
      id: "ORD002",
      customer: "Jane Smith",
      total: "$320",
      status: "Completed",
    },
    {
      key: "3",
      id: "ORD003",
      customer: "Alice Johnson",
      total: "$80",
      status: "Cancelled",
    },
  ];

  const orderColumns = [
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
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Statistics Section */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Sales"
              value={5000}
              prefix={<DollarCircleOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={120}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={45}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={16}>
          <Card title="Recent Orders">
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              pagination={{ pageSize: 3 }}
            />
          </Card>
        </Col>

        {/* Progress Overview */}
        <Col span={8}>
          <Card title="Performance">
            <div style={{ marginBottom: "20px" }}>
              <h4>Sales Target</h4>
              <Progress percent={75} status="active" />
            </div>
            <div>
              <h4>Customer Growth</h4>
              <Progress percent={50} status="exception" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

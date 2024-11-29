"use client";

import React from "react";
import { Result, Button } from "antd";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Result
      status="success"
      title="Order Placed Successfully!"
      subTitle="Your order has been confirmed. We will notify you when your items are shipped."
      extra={[
        <Button type="primary" key="home">
          <Link href="/">Back to Home</Link>
        </Button>,
        <Button key="orders">
          <Link href="/orders">View My Orders</Link>
        </Button>,
      ]}
    />
  );
}

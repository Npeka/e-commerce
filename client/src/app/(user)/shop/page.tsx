"use client";

import React from "react";
import { Card, Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function EditMyShop() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Logic for handling shop information updates
    console.log("Shop Details Updated:", values);
    message.success("Shop information updated successfully!");
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  return (
    <Card title="Edit My Shop" className="mx-auto mt-10 max-w-lg shadow-md">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          shopName: "My Awesome Shop",
          shopAddress: "123 Main Street, Springfield, IL",
          shopDescription: "We sell awesome products at great prices!",
          shopContact: "+1 (555) 123-4567",
        }}
      >
        {/* Shop Name */}
        <Form.Item
          name="shopName"
          label="Shop Name"
          rules={[{ required: true, message: "Please input your shop name!" }]}
        >
          <Input placeholder="Enter your shop name" />
        </Form.Item>

        {/* Shop Address */}
        <Form.Item
          name="shopAddress"
          label="Shop Address"
          rules={[
            { required: true, message: "Please input your shop address!" },
          ]}
        >
          <Input placeholder="Enter your shop address" />
        </Form.Item>

        {/* Shop Description */}
        <Form.Item
          name="shopDescription"
          label="Shop Description"
          rules={[
            { required: true, message: "Please input your shop description!" },
          ]}
        >
          <Input.TextArea placeholder="Describe your shop" rows={4} />
        </Form.Item>

        {/* Shop Contact */}
        <Form.Item
          name="shopContact"
          label="Shop Contact"
          rules={[
            { required: true, message: "Please input your contact details!" },
          ]}
        >
          <Input placeholder="Enter your contact number or email" />
        </Form.Item>

        {/* Upload Logo */}
        <Form.Item label="Shop Logo">
          <Upload
            name="logo"
            action="/upload" // Replace with your upload endpoint
            listType="picture"
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" block>
          Save Changes
        </Button>
      </Form>
    </Card>
  );
}

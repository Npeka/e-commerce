"use client";
import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const categories = [
  { id: "1", name: "Electronics", parentId: null },
  { id: "2", name: "Clothing", parentId: null },
  { id: "3", name: "Mobile Phones", parentId: "1" },
  { id: "4", name: "Laptops", parentId: "1" },
  { id: "5", name: "Women's Clothing", parentId: "2" },
  { id: "6", name: "Men's Clothing", parentId: "2" },
];

export default function CreateProduct() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList); // Update the file list state
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", {
      ...values,
      images: fileList.map((file: any) => file.originFileObj), // Only send raw files
    });
    message.success("Product created successfully!");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create Product</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ status: "Available" }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {categories
              .filter((category) => category.parentId === null)
              .map((parentCategory) => (
                <Select.OptGroup
                  key={parentCategory.id}
                  label={parentCategory.name}
                >
                  {categories
                    .filter(
                      (category) => category.parentId === parentCategory.id,
                    )
                    .map((subCategory) => (
                      <Option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </Option>
                    ))}
                </Select.OptGroup>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Option value="Available">Available</Option>
            <Option value="Out of Stock">Out of Stock</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

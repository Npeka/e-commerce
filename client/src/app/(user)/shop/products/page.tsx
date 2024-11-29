"use client";
// pages/shop/products.tsx
import { Table, Button, Space, Tag } from "antd";
import { useState } from "react";
import Link from "next/link";
import { ColumnType } from "antd/es/table";

interface Product {
  key: string;
  name: string;
  status: string;
  images: string[];
  category_id: string;
  create_at: string;
  update_at: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      key: "1",
      name: "T-Shirt",
      status: "Active",
      images: ["image1.jpg"],
      category_id: "category-1",
      create_at: "2024-11-01T00:00:00Z",
      update_at: "2024-11-10T00:00:00Z",
    },
    {
      key: "2",
      name: "Jeans",
      status: "Inactive",
      images: ["image3.jpg"],
      category_id: "category-2",
      create_at: "2024-10-01T00:00:00Z",
      update_at: "2024-10-10T00:00:00Z",
    },
    // Thêm các sản phẩm vào đây
  ]);

  const columns: ColumnType<Product>[] = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div>
          {images.length > 0 ? (
            images.map((image: any, index: any) => (
              <img
                key={index}
                src={`/images/${image}`}
                alt="Product"
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
            ))
          ) : (
            <span>No images</span>
          )}
        </div>
      ),
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Created At",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "update_at",
      key: "update_at",
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">
            <Link href={`/shop/products/edit/${record.key}`}>Edit</Link>
          </Button>

          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manage Products</h1>
      <Link href="/shop/products/create">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Add New Product
        </Button>
      </Link>
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;

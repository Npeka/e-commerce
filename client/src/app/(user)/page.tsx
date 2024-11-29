"use client";
import { Row, Col } from "antd";
import { Banner } from "@/ui/banner";

import ProductCard from "@/ui/product-card";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: 100000,
    imageUrl: "/airpods-pro-2-hero-select-202409_FV1.jpg",
    isOnSale: 10,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    price: 200000,
    imageUrl: "/laptop.jpg",
    isOnSale: 10,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 3",
    price: 300000,
    imageUrl: "/laptop.jpg",
    isOnSale: 10,
  },
  {
    id: 4,
    name: "Product 1",
    description: "Description of Product 1",
    price: 100000,
    imageUrl: "/laptop.jpg",
    isOnSale: 10,
  },
  {
    id: 5,
    name: "Product 2",
    description: "Description of Product 2",
    price: 200000,
    imageUrl: "/laptop.jpg",
    isOnSale: 10,
  },
  {
    id: 6,
    name: "Product 3",
    description: "Description of Product 3",
    price: 300000,
    imageUrl: "/laptop.jpg",
    isOnSale: 10,
  },
];

export default function HomePage() {
  return (
    <>
      <Banner />
      <h2 className="mb-8 text-center text-3xl font-bold">New Products</h2>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

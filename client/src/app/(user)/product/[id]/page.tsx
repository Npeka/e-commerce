"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Col,
  Row,
  Spin,
  Rate,
  Input,
  List,
  Avatar,
  Typography,
  Flex,
  Space,
} from "antd";
import { useParams } from "next/navigation";
import { ShoppingCartOutlined } from "@ant-design/icons";

// Define a type for the product and review
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isOnSale: number; // Sale percentage
  category: string;
  ratings: number; // Product rating out of 5
};

type Review = {
  userName: string;
  rating: number;
  comment: string;
};

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]); // Store reviews locally
  const [newReview, setNewReview] = useState<Review>({
    userName: "",
    rating: 5,
    comment: "",
  }); // Track new review form state

  // Simulate fetching product data
  useEffect(() => {
    setLoading(true);
    // Here, you'd fetch the product data from an API
    const fetchedProduct: Product = {
      id: 1,
      name: "Product 1",
      description: "This is a great product with many features and benefits.",
      price: 100000,
      imageUrl: "/airpods-pro-2-hero-select-202409_FV1.jpg",
      isOnSale: 10,
      category: "Electronics",
      ratings: 4.5,
    };

    // Simulated reviews
    const fetchedReviews: Review[] = [
      { userName: "Alice", rating: 5, comment: "Amazing product!" },
      { userName: "Bob", rating: 4, comment: "Good value for money." },
      { userName: "Charlie", rating: 3, comment: "It's okay, not the best." },
      { userName: "Diana", rating: 5, comment: "Exceeded my expectations!" },
      {
        userName: "Eve",
        rating: 4,
        comment: "Very satisfied with the purchase.",
      },
      { userName: "Frank", rating: 2, comment: "Not what I expected." },
    ];

    setProduct(fetchedProduct);
    setReviews(fetchedReviews);
    setLoading(false);
  }, [id]);

  const handleReviewChange = (field: string, value: any) => {
    setNewReview((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmitReview = () => {
    if (newReview.comment && newReview.userName) {
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setNewReview({ userName: "", rating: 5, comment: "" }); // Clear form after submission
    } else {
      alert("Please provide a name and a comment.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  const formattedPrice = new Intl.NumberFormat().format(product.price);

  return (
    <Flex vertical gap="large">
      {/* Product Card */}
      <Card title={product.name} bordered={false}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-auto w-full rounded-lg object-cover"
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Typography.Title level={3} className="mb-4">
              Price: ${formattedPrice}
            </Typography.Title>
            {product.isOnSale > 0 && (
              <Typography.Text className="font-bold text-red-600">
                Discount: {product.isOnSale}% OFF
              </Typography.Text>
            )}
            <p className="mb-4">{product.description}</p>
            <div className="mb-4">
              <Typography.Text className="text-gray-500">
                Category:{" "}
              </Typography.Text>
              <Typography.Text strong>{product.category}</Typography.Text>
            </div>
            <div className="mb-4">
              <Rate value={product.ratings} disabled />
              <span className="ml-2">{product.ratings} / 5</span>
            </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              className="mt-4"
              // onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Customer Reviews */}
      {/* <div className="bg-white p-4"> */}
      {/* <Typography.Title level={3}>Customer Reviews</Typography.Title> */}
      <Card title="Customer Reviews">
        <List
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="/globe.svg" />}
                title={
                  <Typography.Text strong>{review.userName}</Typography.Text>
                }
                description={
                  <Flex vertical gap="small">
                    <Rate value={review.rating} disabled />
                    <Typography.Text>{review.comment}</Typography.Text>
                  </Flex>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      {/* </div> */}

      {/* Add Your Review Section */}
      <Card className="mt-8" title="Add Your Review" bordered>
        <div>
          <Input
            placeholder="Your Name"
            value={newReview.userName}
            onChange={(e) => handleReviewChange("userName", e.target.value)}
            className="mb-4"
          />
          <Input.TextArea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => handleReviewChange("comment", e.target.value)}
            rows={4}
            className="mb-4"
          />
          <Rate
            value={newReview.rating}
            onChange={(value) => handleReviewChange("rating", value)}
            className="mb-4"
          />
          <Button type="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </div>
      </Card>
    </Flex>
  );
};

export default ProductPage;

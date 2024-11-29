// pages/shop/register.tsx
"use client";
import { Form, Input, Button, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { Option } = Select;

const RegisterShop = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // Thực hiện logic đăng ký shop ở đây, ví dụ gửi API
    console.log(values);

    // Sau khi đăng ký thành công
    message.success("Shop registered successfully!");
    router.push("/shop/products"); // Chuyển hướng tới trang quản lý sản phẩm
    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Register Your Shop</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {/* Tên Shop */}
        <Form.Item
          label="Shop Name"
          name="shopName"
          rules={[{ required: true, message: "Please input your shop name!" }]}
        >
          <Input placeholder="Enter your shop name" />
        </Form.Item>

        {/* Mô tả Shop */}
        <Form.Item
          label="Shop Description"
          name="shopDescription"
          rules={[
            { required: true, message: "Please input your shop description!" },
          ]}
        >
          <Input.TextArea placeholder="Enter your shop description" rows={4} />
        </Form.Item>

        {/* Địa chỉ Shop */}
        <Form.Item
          label="Shop Address"
          name="shopAddress"
          rules={[
            { required: true, message: "Please input your shop address!" },
          ]}
        >
          <Input placeholder="Enter your shop address" />
        </Form.Item>

        {/* Danh mục Shop */}
        <Form.Item
          label="Shop Category"
          name="shopCategory"
          rules={[
            { required: true, message: "Please select a shop category!" },
          ]}
        >
          <Select placeholder="Select shop category">
            <Option value="clothing">Clothing</Option>
            <Option value="electronics">Electronics</Option>
            <Option value="home">Home & Kitchen</Option>
            <Option value="beauty">Beauty</Option>
            <Option value="toys">Toys</Option>
            {/* Thêm các danh mục shop khác tại đây */}
          </Select>
        </Form.Item>

        {/* Nút Đăng ký */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register Shop
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterShop;

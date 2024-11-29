"use client";
import {
  Layout,
  Card,
  Avatar,
  Button,
  Input,
  Form,
  Upload,
  message,
  Select,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Content } = Layout;
const { Option } = Select;

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    "/default-avatar.png",
  );
  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    address: "1234 Elm Street, Springfield, IL",
    phone: "+1 (123) 456-7890",
    gender: "Male", // Default gender
    cardNumber: "", // New field for card number
    cardExpiry: "", // New field for card expiry
    cardCVV: "", // New field for card CVV
  });

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      setAvatarUrl(info.file.response.url); // Assuming the uploaded image's URL is returned in the response
      message.success("Avatar updated successfully");
    } else if (info.file.status === "error") {
      message.error("Failed to update avatar");
    }
  };

  const handleSubmit = (values: any) => {
    setUserInfo(values);
    message.success("Profile updated successfully");
  };

  return (
    <Card className="mx-auto w-full max-w-lg" title="Profile" bordered={false}>
      <div className="mb-6 flex items-center">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={avatarUrl}
          className="mr-4"
        />
        <div>
          <Upload
            showUploadList={false}
            action="/upload" // Your upload endpoint here
            onChange={handleAvatarChange}
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </div>
      </div>

      <Form
        initialValues={userInfo}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 6 }} // Adjust label width
        wrapperCol={{ span: 18 }} // Adjust input width
      >
        <div>
          <h3 className="text-lg font-semibold">Details</h3>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

          {/* Gender Section */}
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Select your gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          {/* Card Information Section */}
          <h3 className="mt-6 text-lg font-semibold">Card Information</h3>
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: "Please input your card number!" },
            ]}
          >
            <Input type="text" placeholder="1234 5678 9876 5432" />
          </Form.Item>

          <Form.Item
            name="cardExpiry"
            label="Card Expiry"
            rules={[
              {
                required: true,
                message: "Please input your card expiry date!",
              },
            ]}
          >
            <Input type="text" placeholder="MM/YY" />
          </Form.Item>

          <Form.Item
            name="cardCVV"
            label="CVV"
            rules={[{ required: true, message: "Please input your CVV!" }]}
          >
            <Input type="text" placeholder="123" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" block>
          Save Changes
        </Button>
      </Form>
    </Card>
  );
};

export default ProfilePage;

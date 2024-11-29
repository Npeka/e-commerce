"use client";

import React from "react";
import { Card, Form, Input, Button, message } from "antd";

export default function UpdatePaymentMethod() {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        // Handle form submission logic here
        console.log("Payment Method Updated:", values);
        message.success("Payment method updated successfully!");
    };

    return (
        <Card
            title="Update Payment Method"
            className="mx-auto mt-10 max-w-lg shadow-md"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    cardNumber: "",
                    cardExpiry: "",
                    cardCVV: "",
                }}
            >
                <Form.Item
                    name="cardNumber"
                    label="Card Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your card number!",
                        },
                        {
                            len: 16,
                            message: "Card number must be 16 digits long!",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="1234 5678 9876 5432"
                        maxLength={16}
                    />
                </Form.Item>

                <Form.Item
                    name="cardExpiry"
                    label="Card Expiry"
                    rules={[
                        {
                            required: true,
                            message: "Please input your card expiry date!",
                        },
                        {
                            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: "Expiry must be in MM/YY format!",
                        },
                    ]}
                >
                    <Input type="text" placeholder="MM/YY" />
                </Form.Item>

                <Form.Item
                    name="cardCVV"
                    label="CVV"
                    rules={[
                        { required: true, message: "Please input your CVV!" },
                        { len: 3, message: "CVV must be 3 digits!" },
                    ]}
                >
                    <Input type="password" placeholder="123" maxLength={3} />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Update Payment Method
                </Button>
            </Form>
        </Card>
    );
}

"use client";

import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useRouter } from "next/navigation";

export default function Payment() {
    const [amount, setAmount] = useState<number>(0);
    const router = useRouter();

    // Xử lý khi người dùng click vào nút thanh toán
    const handlePayment = async () => {
        if (amount <= 0) {
            message.error("Số tiền thanh toán không hợp lệ");
            return;
        }

        try {
            // Gửi yêu cầu thanh toán tới backend
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            if (data.success) {
                // Chuyển hướng đến trang thanh toán của MOMO
                window.location.href = data.paymentUrl;
            } else {
                message.error(
                    "Không thể thực hiện thanh toán, vui lòng thử lại.",
                );
            }
        } catch (error) {
            message.error("Đã có lỗi xảy ra.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">Thanh toán qua MOMO</h2>
            <Form layout="vertical" className="space-y-4">
                <Form.Item label="Số tiền" required>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={1}
                        placeholder="Nhập số tiền cần thanh toán"
                    />
                </Form.Item>
                <Button type="primary" onClick={handlePayment}>
                    Thanh toán qua MOMO
                </Button>
            </Form>
        </div>
    );
}

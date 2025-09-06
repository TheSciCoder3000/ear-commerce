"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<IDbOrder[]>([]);

  const FetchOrders = async () => {
    const token = await createClient()
      .auth.getSession()
      .then((res) => res.data.session?.access_token);

    if (!token) throw Error("invalid token");
    fetch("/api/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) throw Error("Error in fetching orders");
        return res.json();
      })
      .then((data: { orders: IDbOrder[] }) => {
        setOrders(data.orders);
      })
      .catch(console.error);
  };

  useEffect(() => {
    FetchOrders();
  }, []);
  return (
    <div className="flex flex-col gap-10 w-full">
      {orders.map((order) => (
        <OrderItemComponent key={order.id} order={order} />
      ))}
    </div>
  );
};

interface OrderItemProps {
  order: IDbOrder;
}
const OrderItemComponent: React.FC<OrderItemProps> = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async (orderId: string) => {
    setLoading(true);
    const token = await createClient()
      .auth.getSession()
      .then((res) => res.data.session?.access_token);

    if (!token) throw Error("invalid token");

    const res = await fetch("/api/order/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: orderId,
      }),
    });

    if (res.status == 200) {
      const { url } = (await res.json()) as IcheckoutResponse;
      router.push(url);
    }
  };

  return (
    <div key={order.id} className="px-6 py-10 shadow-md w-full">
      <div>
        <h1 className="text-gray-500">
          <span className="font-semibold text-black">Order:</span> {order.id}
        </h1>
        <p className="text-sm text-gray-400 mb-2">{order.status}</p>
        <p className="text-sm text-gray-400">
          {new Date(order.created_at).toDateString()}
        </p>
      </div>

      {order.status === "processing" && (
        <Button
          disabled={loading}
          onClick={() => handlePayment(order.id)}
          className="cursor-pointer hover:bg-black/70 mt-10"
        >
          Pay
        </Button>
      )}
    </div>
  );
};

export default OrdersPage;

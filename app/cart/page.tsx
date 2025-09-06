"use client";

import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { emptyCart } from "@/store/cart/cartSlice";
import { useCart } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const cart = useCart();
  const fees = 1;
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    setloading(true);
    const token = await createClient()
      .auth.getSession()
      .then((res) => res.data.session?.access_token);

    if (!token) throw Error("invalid token");

    const res = await fetch("/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart,
      }),
    });

    if (res.status == 200) {
      dispatch(emptyCart());
      router.push("/user/order");
    }
  };

  return (
    <div className="mt-30 mb-20 min-h-[70vh]">
      <div className="max-w-[80rem] mx-auto px-5">
        <h1 className="text-3xl mb-4">Cart</h1>
        <hr className="bg-gray-100 h-[2px] mb-5" />

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-5">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="p-5 w-full lg:w-[20rem] rounded-xl shadow-md h-full">
            <h2 className="text-xl mb-5">Summary</h2>
            <div className="grid grid-cols-3 text-gray-500 gap-y-2 mb-10">
              <h3 className="col-span-2">Sub Total:</h3>
              <h3>
                ${" "}
                {cart.reduce(
                  (state, item) => state + item.product.price * item.count,
                  0
                )}
              </h3>

              <h3 className="col-span-2">Fees:</h3>
              <h3>$ {fees}</h3>

              <hr className="col-span-3 bg-gray-300 h-[2px] mt-3" />

              <h3 className="col-span-2 font-bold">Total:</h3>
              <h3 className="font-bold">
                ${" "}
                {cart.reduce(
                  (state, item) => state + item.product.price * item.count,
                  0
                ) + fees}
              </h3>
            </div>
            <Button
              disabled={loading}
              className="w-full hover:bg-black/75 cursor-pointer disabled:cursor-not-allowed disabled:bg-black/60"
              onClick={() => handleCheckout()}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartItemProps {
  item: ICartResponse;
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div key={item.id} className="flex gap-5 w-full">
      <Image
        className="w-[7.5rem] aspect-square"
        src={item.product.image_paths[0]}
        alt={item.id}
      />
      <div className="w-full flex flex-col justify-between pb-2">
        <div>
          <h3 className="text-lg">{item.product.name}</h3>
          <p className="mt-1 text-gray-500 text-sm">
            {item.product.category.name}
          </p>
        </div>

        <div className="flex justify-between font-semibold">
          <h3>$ {item.product.price}</h3>
          <h3>x {item.count}</h3>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

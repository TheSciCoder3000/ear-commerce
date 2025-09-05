import { createClient } from "@/lib/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (token: string) => {
    const response = await fetch("/api/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.json()).carts as ICartResponse[];
  }
);

interface CartPayload {
  product: IProduct;
  value: number;
}

export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ product, value }: CartPayload) => {
    const token = await createClient()
      .auth.getSession()
      .then((res) => res.data.session?.access_token);

    const userId = await createClient()
      .auth.getUser()
      .then((res) => res.data.user?.id);

    if (!userId) throw Error("no user");
    if (!token) throw Error("invalid token");

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product, userId, value }),
    });
    return (await response.json()) as ICartResponse;
  }
);

type RemoveCartType =
  | {
      method: "decrement";
      data: ICartResponse;
    }
  | {
      method: "remove";
      data: null;
    };

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async ({ product, value }: CartPayload) => {
    const token = await createClient()
      .auth.getSession()
      .then((res) => res.data.session?.access_token);

    const userId = await createClient()
      .auth.getUser()
      .then((res) => res.data.user?.id);

    if (!userId) throw Error("no user");
    if (!token) throw Error("invalid token");

    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product, userId, value }),
    });

    const data = (await response.json()) as RemoveCartType;
    return { ...data, productId: product.id };
  }
);

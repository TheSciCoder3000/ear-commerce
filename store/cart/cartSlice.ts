import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addCart, fetchCart, removeCart } from "./CartAsyncThunk";

interface CartSlice {
  cart: ICartResponse[];
  status: "idle" | "pending" | "success" | "failed";
  error: string | null;
}

const initialState: CartSlice = {
  cart: [],
  status: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
        state.cart = [];
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(addCart.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(addCart.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;

        const existing = state.cart.find(
          (item) => item.id === action.payload.id
        );

        if (existing) {
          existing.count += 1; // overwrite
        } else {
          state.cart.push(action.payload);
        }
      })
      .addCase(removeCart.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(removeCart.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;

        const { method, data, productId } = action.payload;

        if (method === "decrement") {
          const existing = state.cart.find((item) => item.id === data.id);
          if (existing) existing.count -= 1; // overwrite
        } else {
          state.cart = state.cart.filter(
            (item) => item.product.id != productId
          );
        }
      });
  },
});

export const selectCount = (state: RootState) => state.cart.cart;
export const { emptyCart } = cartSlice.actions;
export default cartSlice.reducer;

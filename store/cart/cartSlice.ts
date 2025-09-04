import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addCart, fetchCart } from "./CartAsyncThunk";

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
  reducers: {},
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
      });
  },
});

export const selectCount = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;

import { ProductData } from "@/Constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ExtendedProductData extends ProductData {
  count: number;
}

interface CartSlice {
  cart: ExtendedProductData[];
}

const initialState: CartSlice = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ProductData>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (!item) {
        state.cart.push({ ...action.payload, count: 1 });
      } else {
        Object.assign(item, { ...action.payload, count: item.count + 1 });
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (!item) return;

      if (item.count <= 1) {
        console.log("removing item");
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      } else {
        Object.assign(item, { ...item, count: item.count - 1 });
      }
    },
  },
});

export const { add, remove } = cartSlice.actions;

export const selectCount = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCart = (id?: string) =>
  useAppSelector((state) => state.cart.cart);

export const useSelectCart = (id: string) =>
  useAppSelector((state) =>
    state.cart.cart.find((item) => item.product.id === id)
  );

export const useTotalCart = () =>
  useAppSelector((state) =>
    state.cart.cart.reduce((state, item) => {
      return state + item.count;
    }, 0)
  );

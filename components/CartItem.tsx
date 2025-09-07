"use client";

import { useAppDispatch, useSelectCart } from "@/store/hooks";
import Image from "./Image";
import NumebrPicker from "./ui/NumebrPicker";
import { addCart, removeCart } from "@/store/cart/CartAsyncThunk";

interface CartItemProps {
  item: ICartResponse;
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { status } = useSelectCart(item.product.id);
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(removeCart({ product: item.product, value: 0 }));
  };

  const handleDecrementItem = (value: number) => {
    dispatch(removeCart({ product: item.product, value }));
  };

  const handleIncrementItem = (value: number) => {
    dispatch(addCart({ product: item.product, value }));
  };

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
          <div className="flex justify-center items-center gap-5">
            <NumebrPicker
              status={status}
              defaultValue={item.count}
              onDecrement={handleDecrementItem}
              onIncrement={handleIncrementItem}
            />
            <button
              disabled={status === "pending"}
              onClick={handleDeleteItem}
              className="cursor-pointer font-light disabled:text-gray-400 hover:text-red-500 transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

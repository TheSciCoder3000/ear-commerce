"use client";

import React, { useState } from "react";
import NumebrPicker from "./ui/NumebrPicker";
import { useAppDispatch, useSelectCart } from "@/store/hooks";
import { useUser } from "./hooks/useUser";
import { addCart } from "@/store/cart/CartAsyncThunk";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ProductCartControlProps {
  product: IProduct;
}
const ProductCartControl: React.FC<ProductCartControlProps> = ({ product }) => {
  const { cart, status } = useSelectCart(product.id);
  const dispath = useAppDispatch();
  const { user } = useUser();
  const router = useRouter();
  const [value, setValue] = useState(1);

  const handleAddToCart = () => {
    if (!user) router.push("/signin");
    else dispath(addCart({ product, value }));
  };

  return (
    <>
      <NumebrPicker
        status={status}
        defaultValue={cart?.count || 1}
        onValueChange={(val) => setValue(val)}
      />
      <Button
        disabled={status === "pending"}
        onClick={handleAddToCart}
        className="mt-10 text-xl w-full py-7 cursor-pointer hover:bg-[#2563EB]/90 bg-[#2563EB] disabled:bg-[#2563EB]/70"
      >
        Add To Cart
      </Button>
    </>
  );
};

export default ProductCartControl;

import Image from "@/components/Image";
import { FetchCategories } from "@/lib/category/fetch";
import { GetFullOrder } from "@/lib/order";
import { ParseProductTable } from "@/lib/products/fetch";
import { createClient } from "@/lib/supabase/server";
import React from "react";

async function OrderDetailPage({ params }: PageProps<"/user/order/[orderId]">) {
  const { orderId } = await params;
  const supabase = await createClient();
  const fullOrder = await GetFullOrder(supabase, orderId);

  const products = await ParseProductTable(
    fullOrder.order_item.map((item) => {
      return { ...item.product, count: item.count };
    })
  );

  const categories = await FetchCategories().then(([data, error]) => {
    if (error) throw Error(error.message);
    return data;
  });

  return (
    <div className="shadow-xl w-full pt-10 pb-20 px-7 h-fit">
      <div className="flex justify-end mb-10">
        <div className="flex flex-col md:flex-row gap-5 text-sm">
          <h2>ORDER ID: {fullOrder.id}</h2>
          <h2 className="hidden md:block">|</h2>
          <h2>STATUS: {fullOrder.status.toUpperCase()}</h2>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-5">
        {products.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            count={item.count}
            category={
              categories.find((cat) => cat.id === item.category_id)?.name || ""
            }
          />
        ))}
      </div>
    </div>
  );
}

interface ProductItemProps {
  product: IProduct;
  category: string;
  count: number;
}
const ProductItem: React.FC<ProductItemProps> = ({
  product,
  category,
  count,
}) => {
  return (
    <div className="flex gap-5 w-full">
      <div className="w-30 aspect-square">
        <Image
          className="w-full h-full"
          src={product.image_paths[0]}
          alt={product.id}
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-xl">{product.name}</h1>
          <h3 className="text-gray-400 mt-1 text-sm">{category}</h3>
        </div>
        <div className="flex justify-between">
          <h2 className="text-lg">$ {product.price}</h2>
          <h2 className="text-sm">x {count}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

import Image from "@/components/Image";
import ProductCartControl from "@/components/ProductCartControl";
import { FetchProductByIds, ParseProductTable } from "@/lib/products/fetch";
import React from "react";

const page = async ({ params }: PageProps<"/products/[productId]">) => {
  const { productId } = await params;
  const product = await FetchProductByIds([productId], true)
    .then(ParseProductTable)
    .then((product) => product[0]);

  return (
    <div className="px-5 py-10 mt-30 grid grid-cols-1 lg:grid-cols-2 max-w-[90rem] mx-auto gap-10">
      <div className="w-full h-fit overflow-hidden rounded-2xl">
        <Image
          className="w-full h-fit max-h-[700px]"
          src={product.image_paths[0]}
          alt={product.name}
        />
      </div>

      <div>
        <h1 className="text-3xl mb-10">{product.name}</h1>
        <h2 className="text-3xl font-light mb-10">$ {product.price}</h2>
        <div className="mb-5">
          <h3 className="mb-2">Description</h3>
          <p className="text-gray-400">{product.description}</p>
        </div>
        <div className="mb-15">
          <h3 className="mb-2">Category</h3>
          <p className="text-gray-400">{product.category.name}</p>
        </div>
        <ProductCartControl product={product} />
      </div>
    </div>
  );
};

export default page;

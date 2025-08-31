"use client";

import CategoryFilter from "@/components/CategoryFilter";
import PriceRangeSelector from "@/components/PriceRangeSelector";
import ProductItem from "@/components/ProductItem";
import { ProductData } from "@/Constants";
import { store } from "@/store";
import React, { use, useEffect, useState } from "react";
import { Provider } from "react-redux";

function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = use(searchParams).category as string | undefined;
  const [minMax, setMinMax] = useState([0, 3000]);
  const [category, setCategory] = useState<string | undefined>("All");
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((jsonData: { data: ProductData[] }) => setProducts(jsonData.data));
  }, []);
  return (
    <Provider store={store}>
      <div className="my-25 px-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-5">All Headsets</h1>
          <button className="lg:hidden">filter</button>
        </div>

        <hr className="border-gray-300 border-1 mb-10" />

        <div className="flex gap-10 max-w-[100rem]">
          <div className="hidden lg:block w-[15rem]">
            <div>
              <h2 className="mb-3">Categories</h2>
              <CategoryFilter
                defaultFilter={filters}
                setCategory={setCategory}
              />
            </div>

            <div className="mt-10">
              <h2 className="mb-3">Price Range</h2>
              <PriceRangeSelector
                min={minMax[0]}
                max={minMax[1]}
                onValueChange={setMinMax}
              />
            </div>
          </div>

          <div className="flex-1 grid gap-5 grid-cols-1 mb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products
              .filter(
                (prod) => prod.price >= minMax[0] && prod.price <= minMax[1]
              )
              .filter(
                (prod) => category === "All" || prod.category.id === category
              )
              .map((prod) => (
                <ProductItem key={prod.id} isCategory={false} prod={prod} />
              ))}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default ProductsPage;

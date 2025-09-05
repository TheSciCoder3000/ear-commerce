"use client";

import { CategoryData } from "@/Constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductProps = {
  cat: CategoryData;
};

const CategoryItem: React.FC<ProductProps> = ({ cat }) => {
  return (
    <div key={cat.id} className="rounded-md drop-shadow-md flex flex-col">
      <div className="relative bg-gray-400 h-[18rem] overflow-hidden rounded-t-lg">
        <Image
          src={cat.cover}
          alt="item-cover"
          height={0}
          width={0}
          sizes="100vw"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 h-max bg-white rounded-b-lg flex-1">
        <h2 className={`mb-2 font-bold`}>{cat.name}</h2>
        <p className="text-xs text-gray-500">{cat.description}</p>
        <div className="flex justify-between items-end">
          <Link
            className="mt-5 text-blue-700 text-xs"
            href={`/products?category=${cat.id}`}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;

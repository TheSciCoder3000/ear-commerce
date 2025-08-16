"use client";

import { CategoryData, ProductData } from "@/Constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductProps =
  | {
      prod: ProductData;
      isCategory: false;
    }
  | {
      prod: CategoryData;
      isCategory: true;
    };

const ProductItem: React.FC<ProductProps> = ({ prod, isCategory }) => {
  return (
    <div key={prod.id} className="rounded-md drop-shadow-md flex flex-col">
      <div className="relative bg-gray-400 h-[18rem] overflow-hidden rounded-t-lg">
        <Image
          src={isCategory ? prod.cover : prod.image_paths[0]}
          alt="item-cover"
          height={0}
          width={0}
          sizes="100vw"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 h-max bg-white rounded-b-lg flex-1">
        <h2 className={`mb-2 font-${isCategory ? "bold" : "regular"}`}>
          {prod.name}
        </h2>
        <p className="text-xs text-gray-500">
          {isCategory ? prod.description : prod.category.name}
        </p>
        <div className="flex justify-between items-end">
          {isCategory ? (
            <Link className="mt-5 text-blue-700 text-xs" href={""}>
              Shop Now
            </Link>
          ) : (
            <>
              <h2 className="font-bold">${prod.price}</h2>
              <button className="flex items-center justify-center p-1 rounded-full bg-blue-600 w-9 h-9 text-sm">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_83)">
                    <path
                      d="M6.86666 18.9333C7.3269 18.9333 7.69999 18.5602 7.69999 18.0999C7.69999 17.6397 7.3269 17.2666 6.86666 17.2666C6.40642 17.2666 6.03333 17.6397 6.03333 18.0999C6.03333 18.5602 6.40642 18.9333 6.86666 18.9333Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.0333 18.9333C16.4936 18.9333 16.8667 18.5602 16.8667 18.0999C16.8667 17.6397 16.4936 17.2666 16.0333 17.2666C15.5731 17.2666 15.2 17.6397 15.2 18.0999C15.2 18.5602 15.5731 18.9333 16.0333 18.9333Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.90833 2.30835H3.57499L5.79166 12.6583C5.87297 13.0374 6.08388 13.3762 6.38808 13.6166C6.69229 13.8569 7.07075 13.9836 7.45832 13.975H15.6083C15.9876 13.9744 16.3554 13.8444 16.6508 13.6065C16.9463 13.3687 17.1518 13.0371 17.2333 12.6667L18.6083 6.47502H4.46666"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_83">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.199997 0.599976)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

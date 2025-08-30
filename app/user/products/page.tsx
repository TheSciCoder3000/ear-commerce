"use client";
import { useUser } from "@/components/hooks/useUser";
import Image from "@/components/Image";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProduct {
  user_id: string;
  id: string;
  stock: number;
  price: number;
  name: string;
  image_paths: string[];
  description: string;
  created_at: string;
  category_id: string;
  category: {
    id: string;
    description: string;
    name: string;
  };
}

const AdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    fetch(`/api/products/${user.id}`).then(async (res) => {
      const data = await res.json();
      setProducts(data.data);
    });
  }, [user]);
  return (
    <div className="w-full">
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => router.push("/products/add")}
          className="group cursor-pointer"
        >
          <Plus className="group-hover:text-gray-400" size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {products.map((item) => (
          <div key={item.id} className="shadow-md p-5 w-full bg-white">
            <div className="flex gap-10">
              <Image
                src={item.image_paths[0]}
                alt={item.id}
                className="w-[8rem] aspect-square"
              />

              <div className="w-full">
                <h1 className="font-semibold mb-2 text-lg">{item.name}</h1>
                <p className="text-sm text-gray-600 mb-2 max-w-[40rem]">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400">{item.category.name}</p>
                <div className="flex justify-between w-full">
                  <h2 className="mt-3 font-normal">x {item.stock}</h2>
                  <h2 className="mt-3 font-normal">$ {item.price} / unit</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;

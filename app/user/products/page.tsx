"use client";
import { useUser } from "@/components/hooks/useUser";
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { User } from "@supabase/supabase-js";
import { Plus, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const fetchData = (clientUser: User | null) => {
    if (!clientUser) return;
    fetch(`/api/products/${clientUser.id}`).then(async (res) => {
      const data = await res.json();
      setProducts(data.data);
    });
  };

  useEffect(() => {
    fetchData(user);
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
          <ProductListItem
            onDelete={() => fetchData(user)}
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductItemProps {
  item: IProduct;
  onDelete: () => void;
}
const ProductListItem: React.FC<ProductItemProps> = ({ item, onDelete }) => {
  const supabase = createClient();
  const { user } = useUser();

  const handleDelete = async () => {
    if (!user) return;
    const token = await supabase.auth
      .getSession()
      .then((res) => res.data.session?.access_token);

    await fetch(`/api/products/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ids: [item.id],
      }),
    });

    onDelete();
  };
  return (
    <div className="relative shadow-md p-5 w-full bg-white">
      <Dialog>
        <DialogTrigger>
          <TrashIcon
            className="absolute right-5 top-5 cursor-pointer stroke-red-600 hover:stroke-red-300"
            size={15}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to Delete this?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mb-6">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button
                onClick={handleDelete}
                className="bg-red-500 cursor-pointer hover:bg-red-400"
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex gap-10">
        <Image
          src={item.image_paths[0]}
          alt={item.id}
          className="w-[8rem] aspect-square"
        />

        <div className="w-full">
          <h1 className="font-semibold mb-2 text-lg">{item.name}</h1>
          <p className="text-sm text-gray-600 mb-2 max-w-[40rem] line-clamp-2">
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
  );
};

export default AdminProducts;

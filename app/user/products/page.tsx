"use client";
import { useUser } from "@/components/hooks/useUser";
import React, { useEffect } from "react";

const AdminProducts = () => {
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    fetch(`/api/products/${user.id}`).then(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  }, [user]);
  return <div className="shadow-md p-5 w-full bg-white"></div>;
};

export default AdminProducts;

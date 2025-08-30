"use client";

import ErrorWrapper from "@/components/ErrorWrapper";
import InputField from "@/components/InputField";
import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().min(0.01).required(),
  stock: yup.number().positive().required(),
  category: yup.string().required(),
  images: yup
    .mixed<FileList>()
    .test("fileFormat", "Unsupported Format", (value) => {
      if (value instanceof File) {
        const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
        return SUPPORTED_FORMATS.includes(value.type);
      }
      return true;
    })
    .test("fileSize", "Each image must be less than 1MB", (value) => {
      return (
        value && Array.from(value).every((file) => file.size <= 1024 * 1024)
      );
    }),
});

const AddProductPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [sending, setSending] = useState(false);
  interface ICategory {
    id: string;
    name: string;
  }
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data: { message: string; data: ICategory[] }) =>
        setCategories(data.data)
      );
  }, []);

  const supabase = createClient();

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    setSending(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    if (data.images)
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images[]", data.images[i]);
      }

    const user_id = await supabase.auth
      .getUser()
      .then((res) => res.data.user?.id);
    const token = await supabase.auth
      .getSession()
      .then((res) => res.data.session?.access_token);

    if (!user_id || !token) return;
    formData.append("user_id", user_id);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.status === 200) router.back();
    } catch (e) {
      console.error(e);
      setSending(false);
    }
  };

  return (
    <div className="min-h-[80vh] pb-10 mt-25 mb-20 flex justify-center">
      <div className="px-5 max-w-[60rem] w-full">
        <h1 className="text-2xl font-light mb-7 md:text-4xl md:ml-[7.5rem]">
          Post New Product
        </h1>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <InputField>
            <InputLabel htmlFor="title" required>
              Title:
            </InputLabel>
            <ErrorWrapper message={errors.title?.message}>
              <Input {...register("title")} />
            </ErrorWrapper>
          </InputField>

          <InputField>
            <InputLabel htmlFor="price" required>
              Price:
            </InputLabel>
            <ErrorWrapper message={errors.price?.message}>
              <Input
                {...register("price")}
                step={0.01}
                type="number"
                className="w-[9rem]"
                defaultValue={0}
              />
            </ErrorWrapper>
          </InputField>

          <InputField>
            <InputLabel required htmlFor="stock">
              Stock:
            </InputLabel>
            <ErrorWrapper message={errors.stock?.message}>
              <Input
                {...register("stock")}
                type="number"
                className="w-[9rem]"
                defaultValue={1}
              />
            </ErrorWrapper>
          </InputField>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <InputField>
                <InputLabel required htmlFor="category">
                  Category:
                </InputLabel>
                <ErrorWrapper message={errors.category?.message}>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </ErrorWrapper>
              </InputField>
            )}
          />

          <InputField>
            <InputLabel required htmlFor="description">
              Description:
            </InputLabel>
            <ErrorWrapper message={errors.description?.message}>
              <Textarea {...register("description")} className="h-[7rem]" />
            </ErrorWrapper>
          </InputField>

          <InputField>
            <InputLabel required htmlFor="images">
              Images:
            </InputLabel>
            <ErrorWrapper message={errors.images?.message}>
              <Input
                {...register("images")}
                accept="image/*"
                type="file"
                multiple
              />
            </ErrorWrapper>
          </InputField>

          <Button
            disabled={sending}
            type="submit"
            className="w-full mt-10 md:w-fit float-right"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;

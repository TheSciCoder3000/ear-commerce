import AddForm from "@/components/user/AddForm";
import React from "react";

const AddProductPage = () => {
  return (
    <div className="min-h-[80vh] pb-10 mt-25 mb-20 flex justify-center">
      <div className="px-5 max-w-[60rem] w-full">
        <h1 className="text-2xl font-light mb-7 md:text-4xl md:ml-[7.5rem]">
          Post New Product
        </h1>
        <AddForm />
      </div>
    </div>
  );
};

export default AddProductPage;

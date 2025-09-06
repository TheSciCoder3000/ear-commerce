import UserNavbar from "@/components/user/UserNavbar";
import React from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-gray-50/50">
      <div className="min-h-[100vh] max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-10 mt-20 py-10">
        <UserNavbar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

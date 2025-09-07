import { Route } from "next";
import Link from "next/link";
import React from "react";

const links: { label: string; href: Route }[] = [
  {
    label: "Products",
    href: "/user/products",
  },
  {
    label: "Orders",
    href: "/user/order",
  },
];

const UserNavbar = () => {
  return (
    <div className="flex flex-col gap-5 w-[15rem]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-lg font-medium hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default UserNavbar;

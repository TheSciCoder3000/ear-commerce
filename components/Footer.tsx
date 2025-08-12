import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-5 py-10 bg-[#111827] text-white">
      <div className="flex flex-col gap-7 sm:flex-row sm:justify-between">
        <div className="flex-1">
          <h2 className="mb-2 font-bold text-lg">SoundWave</h2>
          <p className="text-gray-500 text-xs">
            Premium headsets for gaming, music, and professional use. Experience
            sound like never before.
          </p>
        </div>

        <div className="flex-1">
          <h2 className="mb-2 font-bold">Shop</h2>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            All Products
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Gaming Headsets
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Wireless Headphones
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Accessories
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Deals & Promotions
          </Link>
        </div>

        <div className="flex-1">
          <h2 className="mb-2 font-bold">Support</h2>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Contact Us
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            FAQ
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Shipping Information
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Returns & Warranty
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Product Manuals
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p className="text-xs text-gray-500 flex-1/6">
          © {new Date().getFullYear()} SoundWave. All rights reserved.
        </p>
        <div className="flex justify-between flex-1 max-w-[25rem]">
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Privacy Policy
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Terms of Service
          </Link>
          <Link className="block mb-2 text-gray-500 text-xs" href={""}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

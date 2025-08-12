"use client";

import React, { useState } from "react";
import useNavbarScroll from "./hooks/useNavbarScroll";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isVisible] = useNavbarScroll();
  const [toggleBurger, setToggleBurger] = useState(false);

  const pathname = usePathname();

  return (
    <div
      className={`fixed w-full top-0 z-40 px-10 py-5 shadow-md bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between ">
        <div>
          <h1 className="font-bold text-2xl text-black">SoundWave</h1>
        </div>

        <div className="hidden gap-5 items-center sm:flex">
          <Link
            className={`${
              pathname === "/" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={`${
              pathname === "/products" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/products"}
          >
            Products
          </Link>
          <Link
            className={`${
              pathname === "/deals" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/deals"}
          >
            Deals
          </Link>
          <Link
            className={`${
              pathname === "/support" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/support"}
          >
            Support
          </Link>
        </div>

        <div className="flex gap-5">
          <button className="flex items-center justify-center p-1 cursor-pointer">
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
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.0333 18.9333C16.4936 18.9333 16.8667 18.5602 16.8667 18.0999C16.8667 17.6397 16.4936 17.2666 16.0333 17.2666C15.5731 17.2666 15.2 17.6397 15.2 18.0999C15.2 18.5602 15.5731 18.9333 16.0333 18.9333Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.90833 2.30835H3.57499L5.79166 12.6583C5.87297 13.0374 6.08388 13.3762 6.38808 13.6166C6.69229 13.8569 7.07075 13.9836 7.45832 13.975H15.6083C15.9876 13.9744 16.3554 13.8444 16.6508 13.6065C16.9463 13.3687 17.1518 13.0371 17.2333 12.6667L18.6083 6.47502H4.46666"
                  stroke="black"
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

          <button
            className="block sm:hidden"
            onClick={() => setToggleBurger((state) => !state)}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.80005 12H20.8"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.80005 18H20.8"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.80005 6H20.8"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden bg-white transition-all duration-200 overflow-hidden ease-in-out ${
          toggleBurger ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-5 flex flex-col gap-5 items-center">
          <Link
            onClick={() => setToggleBurger(false)}
            className={`${
              pathname === "/" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            onClick={() => setToggleBurger(false)}
            className={`${
              pathname === "/products" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/products"}
          >
            Products
          </Link>
          <Link
            onClick={() => setToggleBurger(false)}
            className={`${
              pathname === "/deals" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/deals"}
          >
            Deals
          </Link>
          <Link
            onClick={() => setToggleBurger(false)}
            className={`${
              pathname === "/support" ? "text-gray-800" : "text-gray-400"
            }`}
            href={"/support"}
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

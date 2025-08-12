"use client";

import React from "react";
import useNavbarScroll from "./hooks/useNavbarScroll";

const Navbar = () => {
  const [isVisible] = useNavbarScroll();

  return (
    <div
      className={`sticky top-0 z-40 px-10 py-5 shadow-md bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div>
        <h1 className="font-bold text-3xl">SoundWave</h1>
      </div>
    </div>
  );
};

export default Navbar;

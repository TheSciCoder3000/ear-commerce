"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.signOut();
  }, []);

  return (
    <div className="my-25 min-h-[60vh] flex items-center justify-center">
      <div className="px-7 py-15 max-w-[400px] h-fit shadow-lg rounded-md text-center flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold mb-2">You&apos;ve been Logged Out</h1>
        <p className="text-xs mb-7">
          Thank you for visiting SoundWave. You have been successfully logged
          out of your account.
        </p>
        <div className="flex gap-2">
          <Link
            href={"/signin"}
            className="px-7.5 py-2.5 text-sm rounded-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1e5bdf]"
          >
            Log In Again
          </Link>
          <Link
            href={"/"}
            className="px-7.5 py-2.5 text-sm rounded-sm font-semibold border-1 text-gray-500 border-gray-300 hover:bg-gray-100"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

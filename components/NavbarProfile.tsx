"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const buttonStyle = "px-3 py-1 hover:bg-gray-100";

const NavbarProfile = () => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (session)
    return (
      <div className="relative">
        <Avatar
          className="flex items-center justify-center border-2 border-yellow-500 cursor-pointer"
          onClick={() => setShowMenu((state) => !state)}
        >
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div
          className={`${
            showMenu ? "block" : "hidden"
          } absolute bg-white shadow-lg right-0 rounded-md flex flex-col gap-3 overflow-hidden border-1 border-gray-100`}
        >
          <Link
            onClick={() => setShowMenu(false)}
            className="w-45 px-5 py-2 text-xs hover:bg-gray-50"
            href={"/address"}
          >
            Addresses
          </Link>
          <Link
            onClick={() => setShowMenu(false)}
            className="w-45 px-5 py-2 text-xs hover:bg-gray-50"
            href={"/orders"}
          >
            Orders
          </Link>
          <Link
            onClick={() => setShowMenu(false)}
            className="w-45 px-5 py-2 text-xs hover:bg-gray-50"
            href={"/logout"}
          >
            Log out
          </Link>
        </div>
      </div>
    );

  return (
    <Link className={cn(buttonStyle)} href={"/signin"}>
      Sign In
    </Link>
  );
};

export default NavbarProfile;

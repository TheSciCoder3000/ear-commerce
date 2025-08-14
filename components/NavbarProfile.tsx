"use client";

import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavbarProfile = () => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {session ? (
        <button onClick={() => supabase.auth.signOut()}>Log out</button>
      ) : (
        <Link href={"/signin"}>Sign In</Link>
      )}
    </>
  );
};

export default NavbarProfile;

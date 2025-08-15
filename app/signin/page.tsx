"use client";

import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase/client";

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return (
      <div className="mt-30 mb-10 flex justify-center">
        <div className="max-w-80 w-full px-3">
          <Auth
            providers={["google"]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
};

export default Page;

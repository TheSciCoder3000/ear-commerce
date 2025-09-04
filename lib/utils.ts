import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenizedClient(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader === "") throw Error("unauthorized");
  const token = authHeader?.replace("Bearer ", "");

  return createClient(token);
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

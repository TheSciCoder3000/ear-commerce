import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "odexvzgneahvpxzrefmx.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

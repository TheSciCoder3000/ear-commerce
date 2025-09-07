import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
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

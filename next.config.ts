import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This completely disables ESLint during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

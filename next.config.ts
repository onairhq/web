import type { NextConfig } from "next";

const uid = new Date();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
    serverFunctions: true,
  },
  images: {
    unoptimized: true,
  },
  generateBuildId: () => `build-${uid.getTime()}`,
  deploymentId: `deploy-${uid.getTime()}`,
  output: "standalone",
  reactStrictMode: process.env.NODE_ENV === "development",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;

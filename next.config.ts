import type { NextConfig } from "next";

const uid = new Date();
const isSSG = process.env.EXPORT_SSG === "true";

console.log(isSSG, "isssg");

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
  output: isSSG ? "export" : "standalone",
  basePath: isSSG ? "/web" : undefined,
  cacheComponents: !isSSG,
  partialPrefetching: !isSSG,
  turbopack: {
    resolveAlias: isSSG
      ? { "@/lib/icecast-sdk.lib": "./lib/icecast-sdk.static.lib.ts" }
      : {},
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const uid = new Date();

const getOsExport = (): {
  output: "standalone" | "export" | undefined;
  basePath: string | undefined;
} => {
  return {
    output: process.env.EXPORT_SSG ? "export" : "standalone",
    basePath: process.env.EXPORT_SSG ? "/web" : undefined,
  };
};

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
  output: getOsExport().output,
  basePath: process.env.EXPORT_SSG ? "/web" : undefined,
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

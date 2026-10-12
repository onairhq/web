declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";

    EXPORT_SSG: string | undefined;
    STREAM_URL: string | undefined;

    ICECAST_HOST: string | undefined;
    ICECAST_PORT: string | undefined;
    ICECAST_MOUNT: string | undefined;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";

    ICECAST_HOST: string | undefined;
    ICECAST_PORT: string | undefined;
    ICECAST_MOUNT: string | undefined;
  }
}

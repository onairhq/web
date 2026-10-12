export const getIcecastUrlAndMount = () => {
  const rawHost = (process.env.ICECAST_HOST || "http://127.0.0.1").trim();
  const rawPort = (process.env.ICECAST_PORT || "8000").trim();

  const withProtocol = /^https?:\/\//i.test(rawHost)
    ? rawHost
    : `http://${rawHost}`;

  const url = new URL(withProtocol);

  if (!url.port && rawPort) {
    url.port = rawPort;
  }

  return {
    url: url.origin,
    mount: (process.env.ICECAST_MOUNT || "/radio.mp3").trim(),
  };
};

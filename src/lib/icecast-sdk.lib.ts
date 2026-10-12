import { cacheLife } from "next/cache";

export const getIcecastStatus = async (url: string, mount: string) => {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  let result = {
    stream: { url: null, title: null },
    radio: { description: null, name: null, genre: null, url: null },
  };

  try {
    const res = await fetch(`${url}/status-json.xsl`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return result;

    const { icestats } = await res.json();
    const sources = [icestats.source].flat().filter(Boolean);
    const source = sources.find((s: any) => {
      try {
        const pathname = new URL(s.listenurl).pathname;
        return pathname === new URL(mount, s.listenurl).pathname;
      } catch (error) {
        return false;
      }
    });

    if (!source) return result;

    return {
      stream: {
        url: source?.metadata?.x_icy_url || null,
        title: source?.metadata?.x_icy_title || null,
      },
      radio: {
        description: source?.server_description || null,
        name: source?.server_name || null,
        genre: source?.genre || null,
        url: source?.server_url || null,
      },
    };
  } catch {
    return result;
  }
};

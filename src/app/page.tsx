import { IcecastPlayerComponent } from "@/components/icecast-player/dynamic.component";
import { getIcecastUrlAndMount } from "@/lib/env.lib";
import { getIcecastStatus } from "@/lib/icecast-sdk.lib";

export default async function Page() {
  let streamUrl: string | undefined = process.env.STREAM_URL;

  if (typeof streamUrl === "undefined") {
    const { url, mount } = getIcecastUrlAndMount();
    const { radio } = await getIcecastStatus(url, mount);

    if (radio.url) {
      streamUrl = radio.url;
    }
  }

  if (!streamUrl) {
    return <>not found stream</>;
  }

  return (
    <>
      <IcecastPlayerComponent streamUrl={streamUrl} />
    </>
  );
}

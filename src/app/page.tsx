import { IcecastPlayerComponent } from "@/components/icecast-player/dynamic.component";
import { getIcecastUrlAndMount } from "@/lib/env.lib";
import { getIcecastStatus } from "@/lib/icecast-sdk.lib";

export default async function Page() {
  const { url, mount } = getIcecastUrlAndMount();
  const {
    radio: { url: streamUrl },
  } = await getIcecastStatus(url, mount);
  return (
    <>
      <IcecastPlayerComponent stremUrl={streamUrl} />
    </>
  );
}

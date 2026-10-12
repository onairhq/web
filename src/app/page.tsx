import { IcecastPlayerComponent } from "@/components/icecast-player/dynamic.component";
// import { getIcecastUrlAndMount } from "@/lib/env.lib";
// import { getIcecastStatus } from "@/lib/icecast-sdk.lib";

// const isSSG = process.env.EXPORT_SSG === true;

export default async function Page() {
  let streamUrl: string = process.env.STREAM_URL as string;

  // if (isSSG) {
  //   streamUrl = process.env.STREAM_URL as string;
  // } else {
  //   const { url, mount } = getIcecastUrlAndMount();
  //   const {
  //     radio: { url: icecastStreamUrl },
  //   } = await getIcecastStatus(url, mount);
  //   streamUrl = icecastStreamUrl;
  // }

  return (
    <>
      <IcecastPlayerComponent streamUrl={streamUrl} />
    </>
  );
}

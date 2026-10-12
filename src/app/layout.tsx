import "@/@assets/globals.css";

import { fontGeistMono, fontGeistSans } from "@/lib/font.lib";
// import { getIcecastUrlAndMount } from "@/lib/env.lib";
// import { getIcecastStatus } from "@/lib/icecast-sdk.lib";
import { Providers } from "@/providers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  //   if (typeof process.env.EXPORT_SSG === "undefined") {
  //     const { url, mount } = getIcecastUrlAndMount();
  //     const { stream, radio } = await getIcecastStatus(url, mount);
  //
  //     return {
  //       title: `${stream.title ?? "Live"} | ${radio.name ?? "Radio"}`,
  //       description: radio.description ?? "",
  //       applicationName: radio.name ?? "Radio",
  //       openGraph: {
  //         type: "website",
  //         title: stream.title ?? radio.name ?? "Radio",
  //         description: radio.description ?? "",
  //         url: stream.url ?? url,
  //       },
  //     };
  //   }

  return {
    title: "Radio",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fontGeistSans.variable} ${fontGeistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

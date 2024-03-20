import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "./mantine-datatable.css";
import "@mantine/spotlight/styles.css";
import "dayjs/locale/de";

import { ClerkProvider } from "@clerk/nextjs";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { ReactNode } from "react";
import Providers from "@/server/lib/providers";
import { deDe } from "@clerk/localizations";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClerkProvider localization={deDe}>
          <Providers>
            <MantineProvider>
              <Notifications />
              <ModalsProvider>{children}</ModalsProvider>
            </MantineProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Notifications } from "@mantine/notifications";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

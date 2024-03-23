import { AppLayout } from "@/components/layouts/app-layout";
import { getPermissions } from "@/server/lib/utils/get-permissions";
import { PermissionsProvider } from "@/stores/permissions";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};
const NotificationsContainer = dynamic(
  () => import("../../components/notifications-container"),
  {
    ssr: false,
  }
);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissions = await getPermissions();
  return (
    <>
      <NotificationsContainer>
        <AppLayout>
          <PermissionsProvider permissions={permissions}>
            {children}
          </PermissionsProvider>
        </AppLayout>
      </NotificationsContainer>
    </>
  );
}

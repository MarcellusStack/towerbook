import { AppLayout } from "@/components/layouts/app-layout";
import { getPermissions } from "@/server/lib/utils/get-permissions";
import { PermissionsProvider } from "@/stores/permissions";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissions = await getPermissions();
  return (
    <AppLayout>
      <PermissionsProvider permissions={permissions}>
        {children}
      </PermissionsProvider>
    </AppLayout>
  );
}

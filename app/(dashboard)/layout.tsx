import { AppLayout } from "@/components/layouts/app-layout";

import { getUser } from "@server/lib/utils/get-user";
import { JoinOrganization } from "@components/join-organization";
import { auth } from "@/server/lib/auth";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <AppLayout>
      {session && !session.user?.organizationId ? (
        <JoinOrganization />
      ) : (
        children
      )}
    </AppLayout>
  );
}

import { AppLayout } from "@/components/layouts/app-layout";
import { prisma } from "@/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@server/lib/auth-options";
import { getUser } from "@server/lib/utils/get-user";
import {  JoinOrganization } from "@components/join-organization";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <AppLayout>
      {user && !user.organizationId ? <JoinOrganization /> : children}
    </AppLayout>
  );
}

"use server";

import { prisma } from "@/server/db";
import { clerkClient } from "@clerk/nextjs";

type Permission = {
  [key: string]: boolean;
  name: boolean;
};

export const getSession = async (id: string | null) => {
  if (!id) {
    throw new Error("Sie haben keine Berechtigung für diese Aktion");
  }

  const userMetadata = await prisma.user.findUnique({
    where: { id },
    include: {
      permissions: true,
      organization: { select: { id: true, name: true } },
    },
  });
  const userMetadat = await clerkClient.users.getUser(id);

  if (!userMetadata) {
    throw new Error("Benutzer nicht gefunden");
  }

  const user = {
    id: userMetadata.id as string,
    email: userMetadata.email as string,
    birthDate: userMetadata.birthDate,
    firstName: userMetadata.firstName as string,
    lastName: userMetadata.lastName as string,
    organizationId: userMetadata.organizationId as string,
    organizationName: userMetadata.organization?.name as string,
    permissions: userMetadata.permissions,
  };

  return user;
};

export type SessionProps = NonNullable<
  Awaited<ReturnType<typeof getSession>>
> & {
  permissions: Permission[];
};

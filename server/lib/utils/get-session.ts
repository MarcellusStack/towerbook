"use server";

import { prisma } from "@/server/db";

type Permission = {
  [key: string]: boolean;
  name: boolean;
};

export const getSession = async (id: string | null) => {
  if (!id) {
    throw new Error("Sie haben keine Berechtigung für diese Aktion");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      birthDate: true,
      firstName: true,
      lastName: true,
      organizationId: true,
      permissions: true,
      organization: { select: { name: true } },
    },
  });

  if (!user) {
    throw new Error("Benutzer nicht gefunden");
  }

  const userData = {
    id: user.id as string,
    email: user.email as string,
    birthDate: user.birthDate,
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    organizationId: user.organizationId as string,
    organizationName: user.organization?.name as string,
    permissions: user.permissions,
  };

  return userData;
};

export type SessionProps = NonNullable<
  Awaited<ReturnType<typeof getSession>>
> & {
  permissions: Permission[];
};

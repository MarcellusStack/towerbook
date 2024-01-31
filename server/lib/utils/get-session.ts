"use server";

import { clerkClient } from "@clerk/nextjs";

type Permission = {
  [key: string]: boolean;
  name: boolean;
};

export const getSession = async (id: string | null) => {
  if (!id) {
    throw new Error("Sie haben keine Berechtigung für diese Aktion");
  }

  const userMetadata = await clerkClient.users.getUser(id);

  const user = {
    id: userMetadata.id as string,
    email: userMetadata.emailAddresses[0].emailAddress as string,
    birthDate: userMetadata.publicMetadata.birthDate as string,
    firstName: userMetadata.publicMetadata.firstName as string,
    lastName: userMetadata.publicMetadata.lastName as string,
    organizationId: userMetadata.privateMetadata.organizationId as string,
    organizationName: userMetadata.publicMetadata.organizationName as string,
    permissions: userMetadata.publicMetadata.permissions as Permission[],
  };

  return user;
};

export type SessionProps = NonNullable<
  Awaited<ReturnType<typeof getSession>>
> & {
  permissions: Permission[];
};

import { prisma } from "@/server/db";
import { auth } from "@clerk/nextjs";
import { cache } from "react";

export const getPermissions = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Sie haben keine Berechtigung, diese Aktion auszuführen");
  }

  const permissions = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      permissions: true,
    },
  });

  if (!permissions) {
    return null;
  }

  return permissions.permissions;
});

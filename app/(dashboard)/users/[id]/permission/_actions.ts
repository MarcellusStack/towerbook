"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getUserPermission = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      firstName: true,
      lastName: true,
      role: true,
      towers: true,
      id: true,
    },
  });
});

export type UserPermissionProps = NonNullable<
  Awaited<ReturnType<typeof getUserPermission>>
>;

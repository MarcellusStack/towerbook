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
      towers: {
        select: {
          id: true,
          name: true,
          location: true,
        },
      },
      permissions: {
        select: { name: true, id: true },
      },
      id: true,
    },
  });
}, "readUser");

export type UserPermissionProps = NonNullable<
  Awaited<ReturnType<typeof getUserPermission>>
>;

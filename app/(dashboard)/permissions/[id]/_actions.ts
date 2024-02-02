"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { cache } from "react";

export const getPermission = authFilterQuery(async (search, session) => {
  return await prisma.permission.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search ?? undefined,
    },
    include: {
      users: { select: { id: true, firstName: true, lastName: true } },
    },
  });
}, "readPermission");

export type PermissionProps = NonNullable<
  Awaited<ReturnType<typeof getPermission>>
>;

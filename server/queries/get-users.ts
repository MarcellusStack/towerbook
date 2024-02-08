"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getUsers = authFilterQuery(async (search, session) => {
  return await prisma.user.findMany({
    where: {
      organizationId: session.organizationId,
      email: {
        contains: search ?? undefined,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
    },
  });
}, "readUser");

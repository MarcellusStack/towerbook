"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type User, Role } from "@prisma/client";

export type UserTableProps = Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "role" | "birthDate"
>;

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
      /* towers: true, */
    },
  });
});

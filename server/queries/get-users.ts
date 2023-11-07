import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Profile, Role } from "@prisma/client";

export type UserTableProps = Pick<
  Profile,
  "userId" | "firstName" | "lastName" | "email" | "role" | "birthDate"
>;

export const getUsers = authFilterQuery(async (search, user) => {
  return await prisma.profile.findMany({
    where: {
      organizationId: user.organizationId,
      email: {
        contains: search ?? undefined,
      },
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      birthDate: true,
      /* towers: true, */
    },
  });
}) as (search: string, requiredRoles: Role[]) => Promise<UserTableProps[]>;

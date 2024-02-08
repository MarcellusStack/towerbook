"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type ExtendProfileWithTowerProps } from "@type/index";

import { type Role } from "@prisma/client";

export type UserPermissionProps = Pick<
  ExtendProfileWithTowerProps,
  "firstName" | "lastName" | "role" | "id" | "towers"
>;

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
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserPermissionProps>;

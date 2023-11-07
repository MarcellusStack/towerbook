import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type ExtendProfileWithTowerProps } from "@type/index";

import { type Role } from "@prisma/client";

export type UserPermissionProps = Pick<
  ExtendProfileWithTowerProps,
  "firstName" | "lastName" | "role" | "userId" | "towers"
>;

export const getUserPermission = authFilterQuery(async (search, user) => {
  return await prisma.profile.findFirst({
    where: {
      organizationId: user.organizationId,
      userId: search,
    },
    select: {
      firstName: true,
      lastName: true,
      role: true,
      towers: true,
      userId: true,
    },
  });
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserPermissionProps>;

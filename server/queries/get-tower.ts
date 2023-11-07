import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role } from "@prisma/client";

export type TowerProps = Pick<Tower, "name" | "location" | "number">;

export const getTower = authFilterQuery(async (search, user) => {
  return await prisma.tower.findFirst({
    where: {
      organizationId: user.organizationId,
      id: search,
    },
    select: {
      name: true,
      location: true,
      number: true,
    },
  });
}) as unknown as (search: string, requiredRoles: Role[]) => Promise<TowerProps>;

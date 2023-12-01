import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role } from "@prisma/client";

export const getSearchLists = authFilterQuery(async (search, user) => {
  const towers = await prisma.tower.findMany({
    where: { organizationId: user.organizationId },
    select: { id: true },
  });

  const towerIds = towers.map((tower) => tower.id);

  return await prisma.searchList.findMany({
    where: {
      towerId: {
        in: towerIds,
      },
    },
    select: {
      id: true,
      date: true,
      timeSearched: true,
      firstName: true,
      lastName: true,
      timeFound: true,
      handOverTo: true,
      tower: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}) as (search: string, requiredRoles: Role[]) => Promise<UserTableProps[]>;

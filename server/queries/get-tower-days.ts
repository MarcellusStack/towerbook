import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDays = authFilterQuery(async (search, user) => {
  return await prisma.tower.findFirst({
    where: {
      organizationId: user.organizationId,
      id: search,
    },
    select: {
      towerdays: {
        select: {
          id: true,
          createdAt: true,
          startedAt: true,
          status: true,
          guardLeader: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          towerLeader: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });
});

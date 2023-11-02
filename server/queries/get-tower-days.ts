import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getTowerDays = authFilterQuery(async (search, user) => {
  return await unstable_cache(
    async (search) => {
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
    },
    [],
    {
      tags: [search, "towerdays"],
      revalidate: 1,
    }
  )(search);
});

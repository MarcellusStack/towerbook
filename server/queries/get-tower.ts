import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getTower = authFilterQuery(async (search, user) => {
  return await unstable_cache(
    async (search) => {
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
    },
    [],
    {
      tags: [search],
      revalidate: 1,
    }
  )(search);
});

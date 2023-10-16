import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getTowers = authQuery(async (search, user) => {
  const towers = await unstable_cache(
    async (search) => {
      if (user.role.includes("admin")) {
        return await prisma.tower.findMany({
          where: {
            organizationId: user.organizationId,
            number: search ?? undefined,
          },
        });
      }

      return await prisma.tower.findMany({
        where: {
          organizationId: user.organizationId,
          number: search ?? undefined,
          members: {
            some: {
              id: user.profileId,
            },
          },
        },
      });
    },
    [],
    {
      tags: ["towers"],
      revalidate: 1,
    }
  )(search);
  return towers;
});

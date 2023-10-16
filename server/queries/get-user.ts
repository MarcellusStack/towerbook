import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUser = authQuery(async (search, user) => {
  const userData = await unstable_cache(
    async (search) => {
      const query = await prisma.profile.findFirst({
        where: {
          organizationId: user.organizationId,
          userId: search,
        },
        include: {
          towers: true,
        },
      });

      return query;
    },
    [],
    {
      tags: [search],
      revalidate: 1,
    }
  )(search);
  return userData;
});

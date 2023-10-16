import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUserPermission = authQuery(async (search, user) => {
  const userData = await unstable_cache(
    async (search) => {
      const query = await prisma.profile.findFirst({
        where: {
          organizationId: user.organizationId,
          userId: search,
        },
        select: {
          role: true,
          towers: true,
          userId: true,
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

import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUser = authFilterQuery(async (search, session) => {
  const userData = await unstable_cache(
    async (search) => {
      const query = await prisma.user.findFirst({
        where: {
          organizationId: session.organizationId,
          id: search,
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

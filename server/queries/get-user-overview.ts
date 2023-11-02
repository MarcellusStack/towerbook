import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUserOverview = authFilterQuery(async (search, user) => {
  const userData = await unstable_cache(
    async (search) => {
      return await prisma.profile.findFirst({
        where: {
          organizationId: user.organizationId,
          userId: search,
        },
        select: {
          firstName: true,
          lastName: true,
          title: true,
          birthDate: true,
          email: true,
          phone: true,
          towers: true,
          //add dutyplan when its available
        },
      });
    },
    [],
    {
      tags: [search],
      revalidate: 1,
    }
  )(search);
  return userData;
});

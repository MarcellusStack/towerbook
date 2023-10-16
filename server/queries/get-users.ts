import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUsers = authQuery(async (search, user) => {
  const users = await unstable_cache(
    async (search) => {
      const userData = await prisma.profile.findMany({
        where: {
          organizationId: user.organizationId,
          email: {
            contains: search ?? undefined,
          },
        },
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          birthDate: true,
          towers: true,
        },
      });
      return userData;
    },
    [],
    {
      tags: ["users"],
      revalidate: 1,
    }
  )(search);

  return users;
});

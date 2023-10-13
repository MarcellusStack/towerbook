import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUsers = authQuery(async (search, user) => {
  const users = await unstable_cache(
    async () => {
      const userData = await prisma.profile.findMany({
        where: search
          ? {
              organizationId: user.organizationId,
              OR: [
                {
                  firstName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : { organizationId: user.organizationId },
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          birthDate: true,
        },
      });
      return userData;
    },
    [],
    {
      tags: ["users"],
      revalidate: 10,
    }
  )();
  return users;
});

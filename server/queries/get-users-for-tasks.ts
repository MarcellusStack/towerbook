import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUsersForTasks = authQuery(async (user) => {
  return await unstable_cache(
    async () => {
      return await prisma.profile.findMany({
        where: {
          organizationId: user.organizationId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      });
    },
    [],
    {
      tags: ["users"],
      revalidate: 1,
    }
  )();
});

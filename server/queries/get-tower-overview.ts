"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerOverview = authFilterQuery(async (search, user) => {
  if (user.role.includes("admin")) {
    return await prisma.tower.findFirst({
      where: {
        organizationId: user.organizationId,
        id: search,
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  return await prisma.tower.findFirst({
    where: {
      organizationId: user.organizationId,
      id: search,
      members: {
        some: {
          id: user.profileId,
        },
      },
    },
    select: {
      id: true,
      status: true,
    },
  });
});

export type TowerOverviewProps = NonNullable<
  Awaited<ReturnType<typeof getTowerOverview>>
>;

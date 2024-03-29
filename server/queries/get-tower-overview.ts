"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerOverview = authFilterQuery(async (search, session) => {
  return await prisma.tower.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
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

"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";

export type TowerDayOverviewProps = Pick<
  TowerDay,
  "id" | "createdAt" | "startedAt" | "status"
>;

export const getTowerDayWatchmanPlan = authFilterQuery(
  async (search, session) => {
    return await prisma.towerDay.findFirst({
      where: {
        id: search,
        organizationId: session.organizationId,
      },
      select: {
        id: true,
        guardLeader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        towerLeader: { select: { id: true, firstName: true, lastName: true } },
        watchman: true,
        towerId: true,
      },
    });
  }
);

export type TowerdayWatchmanPlanProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayWatchmanPlan>>
>;

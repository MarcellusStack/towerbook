"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDays = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findMany({
    where: {
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      createdAt: true,
      startedAt: true,
      status: true,
      watchmanStatus: true,
      todoStatus: true,
      incidentStatus: true,
      weatherStatus: true,
      materialStatus: true,
      dutyplanStatus: true,
      guardLeader: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      towerLeader: { select: { firstName: true, lastName: true } },
      tower: {
        select: {
          location: true,
          number: true,
          name: true,
        },
      },
    },
  });
}, "readTowerday");

export type TowerDaysProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDays>>
>;

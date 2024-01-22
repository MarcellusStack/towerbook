"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDays = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findMany({
    where: {
      organizationId: session.organizationId as string,
      id: search,
    },
    select: {
      id: true,
      createdAt: true,
      startedAt: true,
      status: true,
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
        },
      },
    },
  });
});

export type TowerDaysProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDays>>
>;

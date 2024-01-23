"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDayIncident = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      incident: true,
      towerId: true,
    },
  });
});

export type TowerdayIncidentProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayIncident>>
>;

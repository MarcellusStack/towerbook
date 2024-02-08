"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDayWeather = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId,
    },
    select: {
      id: true,
      weather: true,
      towerId: true,
    },
  });
}, "readTowerday");

export type TowerdayWeatherProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayWeather>>
>;

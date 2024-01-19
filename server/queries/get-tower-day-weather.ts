import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";

export type TowerDayWeatherProps = Pick<TowerDay, "id" | "towerId" | "weather">;

export const getTowerDayWeather = authFilterQuery(async (search, session) => {
  const towerday = await prisma.towerDay.findFirst({
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

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayWeatherProps>;

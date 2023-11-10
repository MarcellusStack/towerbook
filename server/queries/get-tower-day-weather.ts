import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";

export type TowerDayWeatherProps = Pick<TowerDay, "id" | "towerId" | "weather">;

export const getTowerDayWeather = authFilterQuery(async (search, user) => {
  const towerday = await prisma.towerDay.findFirst({
    where: {
      id: search,
    },
    select: {
      id: true,
      weather: true,
      towerId: true,
    },
  });

  if (!towerday) throw new Error("Towerday does not exist");

  const checkTowerBelongsToOrganization = await prisma.tower.findFirst({
    where: { id: towerday.towerId, organizationId: user.organizationId },
    select: {
      id: true,
    },
  });

  if (!checkTowerBelongsToOrganization)
    throw new Error("Towerday does not belong to your organization");

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayWeatherProps>;

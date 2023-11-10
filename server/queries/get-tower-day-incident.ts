import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";
import { towerBelongsToOrganization } from "../lib/utils/tower-belong-to-organization";

export type TowerDayIncidentProps = Pick<
  TowerDay,
  "id" | "towerId" | "incident"
>;

export const getTowerDayIncident = authFilterQuery(async (search, user) => {
  const towerday = await prisma.towerDay.findFirst({
    where: {
      id: search,
    },
    select: {
      id: true,
      incident: true,
      towerId: true,
    },
  });

  if (!towerday) throw new Error("Towerday does not exist");

  await towerBelongsToOrganization(towerday.towerId, user.organizationId);

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayIncidentProps>;

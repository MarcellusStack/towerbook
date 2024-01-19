import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";
import { towerBelongsToOrganization } from "../lib/utils/tower-belong-to-organization";

export type TowerDayIncidentProps = Pick<
  TowerDay,
  "id" | "towerId" | "incident"
>;

export const getTowerDayIncident = authFilterQuery(async (search, session) => {
  const towerday = await prisma.towerDay.findFirst({
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

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayIncidentProps>;

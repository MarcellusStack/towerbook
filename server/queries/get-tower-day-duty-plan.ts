import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";
import { towerBelongsToOrganization } from "../lib/utils/tower-belong-to-organization";

export type TowerDayIncidentProps = Pick<
  TowerDay,
  "id" | "towerId" | "incident"
>;

export const getTowerDayDutyPlan = authFilterQuery(async (search, session) => {
  const towerday = await prisma.towerDay.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      createdAt: true,
      dutyplan: {
        select: {
          id: true,
          shifts: {
            select: {
              id: true,
              startTime: true,
              endTime: true,
              type: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
      towerId: true,
    },
  });

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayIncidentProps>;

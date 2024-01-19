import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";

export type TowerDayMaterialProps = Pick<
  TowerDay,
  "id" | "towerId" | "material"
>;

export const getTowerDayMaterial = authFilterQuery(async (search, session) => {
  const towerday = await prisma.towerDay.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId,
    },
    select: {
      id: true,
      material: true,
      towerId: true,
    },
  });

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayMaterialProps>;

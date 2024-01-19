import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay } from "@prisma/client";

export type TowerDayTodoProps = Pick<TowerDay, "id" | "towerId" | "todo">;

export const getTowerDayTodo = authFilterQuery(async (search, session) => {
  const towerday = await prisma.towerDay.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId,
    },
    select: {
      id: true,
      todo: true,
      towerId: true,
    },
  });

  return towerday;
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<TowerDayTodoProps>;

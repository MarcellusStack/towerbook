"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDayTodo = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findFirst({
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
});

export type TowerdayTodoProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayTodo>>
>;

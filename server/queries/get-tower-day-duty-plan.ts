"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDayDutyPlan = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findFirst({
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
}, "readTowerday");

export type TowerdayDutyPlanProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayDutyPlan>>
>;

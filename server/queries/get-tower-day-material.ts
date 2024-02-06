"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerDayMaterial = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findFirst({
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
}, "readTowerday");

export type TowerdayMaterialProps = NonNullable<
  Awaited<ReturnType<typeof getTowerDayMaterial>>
>;

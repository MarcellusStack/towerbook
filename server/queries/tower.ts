"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

import { authFilterQuery } from "@server/lib/utils/query-clients";

export const updateTowerStatus = authAction("updateTower")(
  towerStatusSchema,
  async ({ id, status }, { session }) => {
    try {
      await prisma.tower.update({
        where: {
          id: id,
          organizationId: session.organizationId,
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm");
    }
    revalidatePath("/", "layout");

    return {
      message: `Der Turm wurde aktualisiert`,
    };
  }
);

export const getTowers = authFilterQuery(async (search, session) => {
  return await prisma.tower.findMany({
    where: {
      organizationId: session.organizationId,
      number: search ?? undefined,
    },
  });
}, "readTower");

export type TowersProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>;

export type TowerProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>[0];

export const getTowerOverview = authFilterQuery(async (search, session) => {
  const tower = await prisma.tower.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      id: true,
      status: true,
      main: true,
    },
  });

  if (!tower) {
    throw new Error("Turm nicht gefunden");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const towerdays = await prisma.towerDay.findMany({
    where: {
      towerId: tower.id,
      createdAt: {
        gte: today,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 25,
    select: {
      id: true,
      createdAt: true,
      startedAt: true,
      status: true,
    },
  });

  return {
    ...tower,
    towerdays,
  };
}, "readTower");

export type TowerOverviewProps = NonNullable<
  Awaited<ReturnType<typeof getTowerOverview>>
>;

export const getTowerTowerDays = authFilterQuery(async (search, session) => {
  return await prisma.towerDay.findMany({
    where: {
      organizationId: session.organizationId as string,
      towerId: search,
    },
    select: {
      id: true,
      createdAt: true,
      startedAt: true,
      status: true,
      guardLeader: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      towerLeader: { select: { firstName: true, lastName: true } },
    },
  });
}, "readTowerday");

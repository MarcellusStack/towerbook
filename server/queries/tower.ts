"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

import { authFilterQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

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
  // Check if the user has a relation with any towers
  const userTowers = await prisma.user.findUnique({
    where: { id: session.id },
    select: { towers: { select: { id: true } } },
  });

  const userTowerIds = userTowers?.towers.map((tower) => tower.id);

  // If the user has a relation with any towers, return only those towers
  // If not, return all towers
  return await prisma.tower.findMany({
    where: {
      organizationId: session.organizationId,
      number: search ?? undefined,
      id: userTowerIds?.length ? { in: userTowerIds } : undefined,
    },
    select: {
      id: true,
      number: true,
      status: true,
      location: true,
      main: true,
      type: true,
      name: true,
    },
  });
}, "readTower");

export type TowersProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>;

export const getTower = cache(
  authFilterQuery(async (search, session) => {
    const tower = await prisma.tower.findFirst({
      where: {
        organizationId: session.organizationId,
        id: search,
      },
      select: {
        name: true,
        number: true,
        id: true,
        status: true,
        main: true,
        location: true,
      },
    });

    if (!tower) {
      throw new Error("Turm nicht gefunden");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const searchlists = await prisma.searchList.findMany({
      where: {
        organizationId: session.organizationId,
        date: {
          gte: today,
        },
        status: {
          not: "completed",
        },
        tower: {
          location: tower.location,
        },
      },
      select: {
        id: true,
        timeSearched: true,
        firstName: true,
        lastName: true,
        handOverTo: true,
        status: true,
      },
    });

    const towerdays = await prisma.towerDay.findMany({
      where: {
        organizationId: session.organizationId,
        createdAt: {
          gte: today,
        },
        tower: {
          location: tower.location,
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
      searchlists,
      towerdays,
    };
  }, "readTower")
);

export type getTowerProps = NonNullable<Awaited<ReturnType<typeof getTower>>>;

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

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

import { authFilterQuery } from "@server/lib/utils/query-clients";

export const updateTowerStatus = adminAction(
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
  if (session.role.includes("admin")) {
    return await prisma.tower.findMany({
      where: {
        organizationId: session.organizationId,
        number: search ?? undefined,
      },
    });
  }

  return await prisma.tower.findMany({
    where: {
      organizationId: session.organizationId,
      number: search ?? undefined,
      members: {
        some: {
          id: session.id,
        },
      },
    },
  });
});

export type TowersProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>;

export type TowerProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>[0];

/* export function useGetTowers(search: string) {
  return useQuery({
    queryFn: async () => await getTowers(search, []),
    queryKey: ["towers"],
  });
} */

export const getTowerOverview = authFilterQuery(async (search, session) => {
  if (session.role.includes("admin")) {
    return await prisma.tower.findFirst({
      where: {
        organizationId: session.organizationId,
        id: search,
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  return await prisma.tower.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
      members: {
        some: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
      status: true,
    },
  });
});

export type TowerOverviewProps = NonNullable<
  Awaited<ReturnType<typeof getTowerOverview>>
>;

import { useQuery } from "@tanstack/react-query";

export const useGetTowerOverview = (id: string) => {
  return useQuery({
    queryKey: ["tower-overview", id],
    queryFn: async () => await getTowerOverview(id, []),
  });
};

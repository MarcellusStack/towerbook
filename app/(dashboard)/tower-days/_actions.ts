"use server";
import { prisma } from "@server/db";
import { adminAction, authAction } from "@server/lib/utils/action-clients";
import { createTowerDaysSchema } from "@/schemas";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export const getTowersAction = authAction("readTower")(
  z.object({}),
  async ({}, { session }) => {
    try {
      const towers = await prisma.tower.findMany({
        where: {
          organizationId: session.organizationId,
        },
        select: {
          id: true,
          name: true,
          number: true,
        },
      });

      return { towers: towers, message: "Türme erfolgreich geladen" };
    } catch (error) {
      throw new Error("Fehler beim laden der Türme");
    }
  }
);

export const createTowerDays = authAction("createTowerday")(
  createTowerDaysSchema,
  async ({ createdAt, guardLeader, towerdays }, { session }) => {
    try {
      const towerDayData = towerdays.map((towerday) => {
        const date = new Date(createdAt as Date);
        date.setHours(0, 0, 0, 0);

        return {
          createdAt: date,
          guardLeaderId: guardLeader.id,
          towerId: towerday.tower.id,
          towerLeaderId: towerday.towerLeader.id,
          organizationId: session.organizationId as string,
        };
      });

      await prisma.towerDay.createMany({
        data: towerDayData,
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde erstellt` };
  }
);

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createTowerDaySchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type TowerType } from "@prisma/client";
import { extractTimeFromDate } from "@/utils";

export const createTowerDay = adminAction(
  createTowerDaySchema,
  async (
    { createdAt, startedAt, guardLeader, towerLeader, towerId },
    { user }
  ) => {
    try {
      const [hours, minutes] = startedAt.split(":");
      const startTime = new Date();
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const towerday = await prisma.towerDay.create({
        data: {
          createdAt: new Date(createdAt as Date),
          startedAt: extractTimeFromDate(startTime),
          tower: { connect: { id: towerId } },
          guardLeader: { connect: { id: guardLeader } },
          towerLeader: { connect: { id: towerLeader } },
        },
        select: {
          id: true,
        },
      });

      if (!towerday.id) {
        throw new Error("Couldnt create towerday");
      }
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde erstellt.` };
  }
);

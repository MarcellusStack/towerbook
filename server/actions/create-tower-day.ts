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
      const towerday = await prisma.towerDay.create({
        data: {
          createdAt: new Date(createdAt as Date),
          startedAt: extractTimeFromDate(startedAt),
          tower: { connect: { id: towerId } },
          guardLeader: { connect: { id: guardLeader.id } },
          towerLeader: { connect: { id: towerLeader.id } },
          organization: { connect: { id: user.organizationId as string } },
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

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayWatchmanPlanSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateTowerDayWatchmanPlan = adminAction(
  towerDayWatchmanPlanSchema,
  async ({ id, guardLeader, towerLeader, watchman }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          watchmanStatus: {
            not: "completed",
          },
        },
        data: {
          watchmanStatus: "ongoing",
          guardLeader: { connect: { id: guardLeader } },
          towerLeader: { connect: { id: towerLeader } },
          watchman: watchman,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Turm Tag wurde aktualisiert`,
    };
  }
);

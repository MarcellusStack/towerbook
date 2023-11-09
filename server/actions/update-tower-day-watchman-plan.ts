"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayWatchmanPlanSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateTowerDayWatchmanPlan = adminAction(
  towerDayWatchmanPlanSchema,
  async ({ id, guardLeader, towerLeader, watchman }, { user }) => {
    try {
      // check if form is already on status completed based on that
      // dont allow to update the form?
      const towerday = await prisma.towerDay.update({
        where: {
          id: id,
        },
        data: {
          status: "ongoing",
          watchmanStatus: "ongoing",
          guardLeader: { connect: { id: guardLeader } },
          towerLeader: { connect: { id: towerLeader } },
          watchman: watchman,
        },
        select: { id: true },
      });

      if (!towerday.id) {
        throw new Error("Couldnt update tower day");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag wurde aktualisiert.`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag");
    }
  }
);

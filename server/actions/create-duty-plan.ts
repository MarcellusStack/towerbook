"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { dutyPlanSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const createDutyPlan = adminAction(
  dutyPlanSchema,
  async ({ towerId, towerDayId, date }, { user }) => {
    try {
      // check if form is already on status completed based on that
      // dont allow to update the form?
      const dutyplan = await prisma.dutyPlan.create({
        data: {
          tower: { connect: { id: towerId } },
          towerDay: { connect: { id: towerDayId } },
          date: new Date(date as Date),
        },

        select: { id: true },
      });

      if (!dutyplan.id) {
        throw new Error("Couldnt create dutyplan");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Dienstplan wurde erstellt.`,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Fehler beim erstellen des Dienstplan.");
    }
  }
);

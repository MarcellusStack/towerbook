"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { dutyPlanSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const createDutyPlan = adminAction(
  dutyPlanSchema,
  async ({ towerId, towerDayId, date }) => {
    try {
      // check if form is already on status completed based on that
      // dont allow to update the form?
      await prisma.dutyPlan.create({
        data: {
          tower: { connect: { id: towerId } },
          towerDay: { connect: { id: towerDayId } },
          date: new Date(date as Date),
        },
      });

      revalidatePath("/", "layout");

      return {
        message: `Der Dienstplan wurde erstellt`,
      };
    } catch (error) {
      throw new Error("Fehler beim erstellen des Dienstplan");
    }
  }
);

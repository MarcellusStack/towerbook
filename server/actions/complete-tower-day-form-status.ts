"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerDayFormStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const completeTowerDayFormStatus = authAction("completeTowerdaySection")(
  towerDayFormStatusSchema,
  async ({ id, form }, { session }) => {
    try {
      const towerday = await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          [form]: { not: "completed" },
          organizationId: session.organizationId as string,
        },
        data: {
          [form]: "completed",
        },
        select: { id: true },
      });

      if (!towerday.id) {
        throw new Error(
          "Turm Tag Formular nicht gefunden oder bereits abgeschlossen"
        );
      }
    } catch (error) {
      throw new Error("Fehler beim abschließen des Turm Tag Formular");
    }

    revalidatePath("/", "layout");

    return {
      message: `Das Turm Tag Formular wurde aktualisiert`,
    };
  }
);

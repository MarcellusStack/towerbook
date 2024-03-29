"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerDayIncidentSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateTowerDayIncident = authAction("updateTowerday")(
  towerDayIncidentSchema,
  async ({ id, incident }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          incidentStatus: {
            not: "completed",
          },
        },
        data: {
          incidentStatus: "ongoing",
          incident: incident,
        },
        select: { id: true },
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

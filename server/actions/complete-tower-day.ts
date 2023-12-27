"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const completeTowerDay = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { user }) => {
    try {
      const towerday = await prisma.towerDay.findUnique({
        where: { id: id },
        select: {
          id: true,
          watchmanStatus: true,
          todoStatus: true,
          incidentStatus: true,
          weatherStatus: true,
          materialStatus: true,
          dutyplanStatus: true,
        },
      });

      if (!towerday) {
        throw new Error("Couldnt find tower day");
      }

      await prisma.revision.deleteMany({
        where: {
          modelId: towerday.id,
        },
      });

      const allCompleted =
        towerday.watchmanStatus === "completed" &&
        towerday.todoStatus === "completed" &&
        towerday.incidentStatus === "completed" &&
        towerday.weatherStatus === "completed" &&
        towerday.materialStatus === "completed" &&
        towerday.dutyplanStatus === "completed";

      const updatedStatuses = {
        watchmanStatus:
          towerday.watchmanStatus !== "completed" ? "incomplete" : "completed",
        todoStatus:
          towerday.todoStatus !== "completed" ? "incomplete" : "completed",
        incidentStatus:
          towerday.incidentStatus !== "completed" ? "incomplete" : "completed",
        dutyplanStatus:
          towerday.dutyplanStatus !== "completed" ? "incomplete" : "completed",
        weatherStatus:
          towerday.weatherStatus !== "completed" ? "incomplete" : "completed",
        materialStatus:
          towerday.materialStatus !== "completed" ? "incomplete" : "completed",
      };

      await prisma.towerDay.update({
        where: { id: id, status: { notIn: ["open", "completed"] } },
        data: {
          ...updatedStatuses,
          status: allCompleted ? "completed" : "ongoing",
        },
      });

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag Status wurde aktualisiert`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag Status");
    }
  }
);

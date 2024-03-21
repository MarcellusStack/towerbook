"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const completeTowerDay = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }) => {
    //add transaction
    try {
      await prisma.$transaction(
        async (tx) => {
          const towerday = await tx.towerDay.findUnique({
            where: { id: id },
            select: {
              id: true,
              towerId: true,
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

          await tx.revision.deleteMany({
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
              towerday.watchmanStatus !== "completed"
                ? "incomplete"
                : "completed",
            todoStatus:
              towerday.todoStatus !== "completed" ? "incomplete" : "completed",
            incidentStatus:
              towerday.incidentStatus !== "completed"
                ? "incomplete"
                : "completed",
            dutyplanStatus:
              towerday.dutyplanStatus !== "completed"
                ? "incomplete"
                : "completed",
            weatherStatus:
              towerday.weatherStatus !== "completed"
                ? "incomplete"
                : "completed",
            materialStatus:
              towerday.materialStatus !== "completed"
                ? "incomplete"
                : "completed",
          };

          const updatedTowerday = await tx.towerDay.update({
            where: { id: id, status: { notIn: ["open", "completed"] } },
            data: {
              ...updatedStatuses,
              status: allCompleted ? "completed" : "ongoing",
            },
            select: {
              id: true,
              status: true,
            },
          });

          /* if (updatedTowerday && updatedTowerday.status === "completed") {
            await tx.tower.update({
              where: { id: towerday.towerId },
              data: {
                status: "beach_closed",
              },
            });
          } */
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag Status wurde aktualisiert`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag Status");
    }
  }
);

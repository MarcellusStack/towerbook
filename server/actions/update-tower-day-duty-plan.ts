"use server";
import { prisma } from "@server/db";
import { adminAction, authAction } from "@server/lib/utils/action-clients";
import { towerDayDutyPlanSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { ShiftType } from "@prisma/client";

export const updateTowerDayDutyPlan = authAction("updateDutyplan")(
  towerDayDutyPlanSchema,
  async ({ towerDayId, towerId, dutyPlanId, shifts }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const filteredTowerDay = await tx.towerDay.findUnique({
            where: { id: towerDayId, organizationId: session.organizationId },
            select: {
              id: true,
              dutyplan: {
                select: {
                  id: true,
                  shifts: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          });

          if (!filteredTowerDay) {
            throw new Error("Couldnt tower day");
          }

          const currentShiftIds = filteredTowerDay.dutyplan.shifts.map(
            (shift) => shift
          );

          const shiftsToDelete = currentShiftIds.filter(
            (shift) => !shifts.includes(shift.id)
          );

          if (shiftsToDelete.length > 0) {
            await tx.shift.deleteMany({
              where: { id: { in: shiftsToDelete.map((shift) => shift.id) } },
            });
          }

          const shiftsToConnect = shifts.filter(
            (shift) => !currentShiftIds.includes(shift.id)
          );

          const dutyplan = await tx.dutyPlan.update({
            where: {
              id: dutyPlanId,
            },
            data: {
              shifts: {
                createMany: {
                  data: shiftsToConnect.map((shift) => ({
                    id: shift.id,
                    type: shift.type as ShiftType,
                    startTime: new Date(shift.startTime),
                    endTime: new Date(shift.endTime),
                    userId: shift.user.id,
                  })),
                },
              },
            },
            select: { id: true },
          });

          if (!dutyplan.id) {
            throw new Error("Couldnt update dutyplan");
          }

          await tx.towerDay.update({
            where: {
              id: towerDayId,
              status: { notIn: ["revision", "completed"] },
            },
            data: {
              dutyplanStatus: "ongoing",
            },
            select: { id: true },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Dienstplan");
    }
    revalidatePath(`/tower-days/${towerDayId}/duty-plan`, "page");

    return {
      message: `Der Dienstplan wurde aktualisiert`,
    };
  }
);

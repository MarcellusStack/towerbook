"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayDutyPlanSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { ShiftType, type Role } from "@prisma/client";
import { towerBelongsToOrganization } from "@server/lib/utils/tower-belong-to-organization";
import { z } from "zod";

export const updateTowerDayDutyPlan = adminAction(
  towerDayDutyPlanSchema,
  async ({ towerDayId, towerId, dutyPlanId, shifts }, { session }) => {
    try {
      const filteredTowerDay = await prisma.towerDay.findUnique({
        where: { id: towerDayId, towerId: towerId },
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

      await towerBelongsToOrganization(towerId, session.organizationId);

      const currentShiftIds = filteredTowerDay.dutyplan.shifts.map(
        (shift) => shift
      );

      const shiftsToDelete = currentShiftIds.filter(
        (shift) => !shifts.includes(shift.id)
      );

      if (shiftsToDelete.length > 0) {
        await prisma.shift.deleteMany({
          where: { id: { in: shiftsToDelete.map((shift) => shift.id) } },
        });
      }

      const shiftsToConnect = shifts.filter(
        (shift) => !currentShiftIds.includes(shift.id)
      );

      const dutyplan = await prisma.dutyPlan.update({
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

      await prisma.towerDay.update({
        where: {
          id: towerDayId,
          status: { notIn: ["revision", "completed"] },
        },
        data: {
          dutyplanStatus: "ongoing",
        },
        select: { id: true },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Dienstplan");
    }
    revalidatePath("/", "layout");

    return {
      message: `Der Dienstplan wurde aktualisiert.`,
    };
  }
);

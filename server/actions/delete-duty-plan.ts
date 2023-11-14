"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const deleteDutyPlan = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    try {
      //check for related tower that belongs to org to delete dutyplan
      const tower = await prisma.tower.findFirst({
        where: {
          organizationId: user.organizationId,
          dutyplans: {
            some: {
              id: id,
            },
          },
        },
      });

      if (!tower) {
        throw new Error("Couldnt find related tower");
      }

      const dutyplan = await prisma.dutyPlan.delete({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });

      if (!dutyplan.id) {
        throw new Error("Couldnt delete duty plan");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen des Dienstplan");
    }

    revalidatePath("/", "layout");

    return { message: `Der Dienstplan wurde gelöscht.` };
  }
);

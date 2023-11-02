"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const deleteTowerDay = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    try {
      //find related tower to delete tower day
      const tower = await prisma.tower.findFirst({
        where: {
          organizationId: user.organizationId,
          towerdays: {
            some: {
              id: id,
            },
          },
        },
      });

      if (!tower) {
        throw new Error("Couldnt find related tower");
      }

      const towerday = await prisma.towerDay.delete({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });

      if (!towerday.id) {
        throw new Error("Couldnt delete tower day");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen des Turm Tag");
    }

    revalidateTag("towerdays");

    return `Der Turm Tag wurde gelöscht.`;
  }
);

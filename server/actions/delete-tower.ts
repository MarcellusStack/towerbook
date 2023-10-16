"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const deleteTower = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    try {
      const tower = await prisma.tower.delete({
        where: {
          organizationId: user.organizationId,
          id: id,
        },
        select: {
          id: true,
        },
      });

      if (!tower.id) {
        throw new Error("Couldnt delete tower");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Fehler beim löschen des Turm");
    }

    revalidateTag("towers");

    return `Der Turm wurde gelöscht.`;
  }
);

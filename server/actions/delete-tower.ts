"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteTower = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      await prisma.tower.delete({
        where: {
          organizationId: session.organizationId,
          id: id,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen des Turm");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm wurde gelöscht` };
  }
);

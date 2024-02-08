"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteTowerDay = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      const towerday = await prisma.towerDay.delete({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde gelöscht` };
  }
);

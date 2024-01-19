"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateTowerStatus = adminAction(
  towerStatusSchema,
  async ({ id, status }, { session }) => {
    try {
      await prisma.tower.update({
        where: {
          id: id,
          organizationId: session.organizationId,
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm");
    }
    revalidatePath("/", "layout");

    return {
      message: `Der Turm wurde aktualisiert`,
    };
  }
);

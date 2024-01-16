"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayMaterialSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateTowerDayMaterial = adminAction(
  towerDayMaterialSchema,
  async ({ id, material }, { user }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          materialStatus: {
            not: "completed",
          },
        },
        data: {
          materialStatus: "ongoing",
          material: material,
        },
        select: { id: true },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Turm Tag wurde aktualisiert.`,
    };
  }
);

"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { updateTowerSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { type TowerType } from "@prisma/client";

export const updateTower = authAction("updateTower")(
  updateTowerSchema,
  async ({ id, name, main, type, number, location }, { session }) => {
    try {
      await prisma.tower.update({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
        data: {
          name: name,
          main: main,
          type: type as TowerType,
          number: number,
          location: location,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turms");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm wurde aktualisiert` };
  }
);

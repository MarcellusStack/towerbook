"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createTowerSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type TowerType } from "@prisma/client";

export const createTower = adminAction(
  createTowerSchema,
  async ({ name, main, type, number, location }, { session }) => {
    try {
      await prisma.tower.create({
        data: {
          name: name,
          main: main,
          type: type as TowerType,
          number: number,
          location: location,
          organization: {
            connect: {
              id: session.organizationId as string,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turms");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm wurde erstellt` };
  }
);

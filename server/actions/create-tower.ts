"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createTowerSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type TowerType } from "@prisma/client";

export const createTower = adminAction(
  createTowerSchema,
  async ({ name, type, number, location }, { user }) => {
    try {
      const tower = await prisma.tower.create({
        data: {
          name: name,
          type: type as TowerType,
          number: number,
          location: location,
          organization: {
            connect: {
              id: user.organizationId as string,
            },
          },
        },
        select: {
          id: true,
        },
      });

      if (!tower.id) {
        throw new Error("Couldnt create tower");
      }
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turms");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm wurde erstellt.` };
  }
);

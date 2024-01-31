"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { createTowerSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type TowerType } from "@prisma/client";

export const createTower = authAction("createTower")(
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
      throw new Error("Fehler beim erstellen des Turms");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm wurde erstellt` };
  }
);

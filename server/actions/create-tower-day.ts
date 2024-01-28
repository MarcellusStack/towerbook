"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createTowerDaySchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const createTowerDay = adminAction(
  createTowerDaySchema,
  async ({ createdAt, guardLeader, towerLeader, towerId }, { session }) => {
    try {
      await prisma.towerDay.create({
        data: {
          createdAt: new Date(createdAt as Date),
          tower: { connect: { id: towerId } },
          guardLeader: { connect: { id: guardLeader.id } },
          towerLeader: { connect: { id: towerLeader.id } },
          organization: { connect: { id: session.organizationId as string } },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde erstellt` };
  }
);

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const openTowerDay = adminAction(
  z.object({ id: z.string().min(1, { message: "Id wird benötigt" }) }),
  async ({ id }, { user }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          organizationId: user.organizationId as string,
        },
        data: {
          status: "ongoing",
        },
        select: { id: true, towerId: true },
      });
    } catch (error) {
      throw new Error("Fehler beim öffnen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Turm Tag wurde eröffnet`,
    };
  }
);

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { openTowerdaySchema } from "@/schemas";

export const openTowerDay = adminAction(
  openTowerdaySchema,
  async ({ id, startedAt }, { session }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
        data: {
          status: "ongoing",
          startedAt: extractTimeFromDate(startedAt),
        },
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

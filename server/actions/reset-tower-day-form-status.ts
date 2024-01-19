"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayFormStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const resetTowerDayFormStatus = adminAction(
  towerDayFormStatusSchema,
  async ({ id, form }, { session }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: "revision",
          organizationId: session.organizationId as string,
        },
        data: {
          [form]: "ongoing",
        },
        select: { id: true },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag Form Status");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Turm Tag Form Status wurde aktualisiert`,
    };
  }
);

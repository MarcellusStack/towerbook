"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayFormStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const resetTowerDayFormStatus = adminAction(
  towerDayFormStatusSchema,
  async ({ id, form }, { user }) => {
    try {
      const towerday = await prisma.towerDay.update({
        where: {
          id: id,
          status: "revision",
          organizationId: user.organizationId as string,
        },
        data: {
          [form]: "ongoing",
        },
        select: { id: true },
      });

      if (!towerday.id) {
        throw new Error("Konnnte den Turm Tag Form Status nicht aktualisieren");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag Form Status wurde aktualisiert.`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag Form Status");
    }
  }
);

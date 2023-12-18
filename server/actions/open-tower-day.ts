"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { towerBelongsToOrganization } from "../lib/utils/tower-belong-to-organization";

export const openTowerDay = adminAction(
  z.object({ id: z.string().min(1, { message: "Id wird benötigt" }) }),
  async ({ id }, { user }) => {
    try {
      const towerday = await prisma.towerDay.update({
        where: {
          id: id,
        },
        data: {
          status: "ongoing",
        },
        select: { id: true, towerId: true },
      });

      if (!towerday.id) {
        throw new Error("Konnte Turm Tag nicht aktualisieren");
      }

      await towerBelongsToOrganization(towerday.towerId, user.organizationId);

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag wurde eröffnet`,
      };
    } catch (error) {
      throw new Error("Fehler beim öffnen des Turm Tag");
    }
  }
);

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const removeUserFromCompany = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { session }) => {
    if (session.id === id) {
      throw new Error("Sie können sich selber nicht entfernen");
    }

    try {
      await prisma.user.update({
        where: {
          organizationId: session.organizationId,
          id: id,
        },
        data: {
          organization: {
            disconnect: {
              id: id,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim entfernen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: `Der Benutzer wurde entfernt` };
  }
);

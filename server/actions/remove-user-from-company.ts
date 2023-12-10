"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema, deleteUserSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const removeUserFromCompany = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { user }) => {
    if (user.id === id) {
      throw new Error("Sie können sich selber nicht entfernen.");
    }

    try {
      const profile = await prisma.profile.update({
        where: {
          organizationId: user.organizationId,
          userId: id,
        },
        data: {
          organization: {
            disconnect: {
              id: id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      if (!profile.id) {
        throw new Error("Fehler beim entfernen des Benutzer");
      }
    } catch (error) {
      throw new Error("Fehler beim entfernen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: `Der Benutzer wurde entfernt.` };
  }
);

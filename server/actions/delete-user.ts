"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteUser = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    if (session.id === id) {
      throw new Error("Sie können sich selber nicht löschen.");
    }

    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.delete({
            where: {
              organizationId: session.organizationId,
              id: id,
            },
            select: {
              firstName: true,
              lastName: true,
              id: true,
            },
          });

          if (!user.id) {
            throw new Error("Couldnt delete profile");
          }

          const { error } = await supabase.auth.admin.deleteUser(user.id);

          if (error) {
            throw new Error("Couldnt delete user");
          }
        },
        {
          maxWait: 15000, // default: 2000
          timeout: 15000, // default: 5000
        }
      );
    } catch (error) {
      throw new Error("Fehler beim löschen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: `Der Benutzer wurde gelöscht` };
  }
);

"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema, deleteUserSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const deleteUser = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    if (user.id === id) {
      throw new Error("Sie können sich selber nicht löschen.");
    }

    try {
      await prisma.$transaction(
        async (tx) => {
          const profile = await tx.profile.delete({
            where: {
              organizationId: user.organizationId,
              userId: id,
            },
            select: {
              firstName: true,
              lastName: true,
              id: true,
            },
          });

          

          if (!profile.id) {
            throw new Error("Couldnt delete profile");
          }

          const { error } = await supabase.auth.admin.deleteUser(id);

          if (error) {
            throw new Error("Couldnt delete user");
          }
          return profile;
        },
        {
          maxWait: 15000, // default: 2000
          timeout: 15000, // default: 5000
        }
      );
    } catch (error) {
      throw new Error("Fehler beim löschen des Benutzer");
    }

    revalidateTag("users");

    return `Der Benutzer wurde gelöscht.`;
  }
);

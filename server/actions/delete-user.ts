"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const deleteUser = adminAction(
  deleteUserSchema,
  async ({ userId }, { user }) => {
    if (user.id === userId) {
      throw new Error("Sie können sich selber nicht löschen.");
    }
    try {
      await prisma.$transaction(
        async (tx) => {
          console.log("before profile delete");
          const profile = await tx.profile.delete({
            where: {
              organizationId: user.organizationId,
              userId: userId,
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
          console.log("not prisma error");
          const { error } = await supabase.auth.admin.deleteUser(userId);

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
      console.log(error);
      throw new Error("Fehler beim löschen des Benutzer");
    }

    revalidateTag("users");

    return `Der Benutzer wurde gelöscht.`;
  }
);

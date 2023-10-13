"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userPermissionsSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const updateUserPermissions = adminAction(
  userPermissionsSchema,
  async ({ role, userId }, { user }) => {
    try {
      const profile = await prisma.profile.update({
        where: {
          organizationId: user.organizationId,
          userId: userId,
        },
        data: {
          role: role,
        },
        select: { id: true, role: true, firstName: true, lastName: true },
      });

      if (!profile.id) {
        throw new Error("Couldnt update Permissions");
      }
      revalidateTag(userId);
      revalidateTag("users");

      return `Der Benutzer ${profile.firstName} ${profile.lastName} wurde aktualisiert.`;
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }
  }
);

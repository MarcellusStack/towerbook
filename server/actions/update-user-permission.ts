"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userPermissionsSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const updateUserPermissions = adminAction(
  userPermissionsSchema,
  async ({ userId, role, towers }, { user }) => {
    try {
      const filteredProfile = await prisma.profile.findUnique({
        where: { userId: userId, organizationId: user.organizationId },
        include: {
          towers: true,
        },
      });

      if (!filteredProfile) {
        throw new Error("Couldnt find profile");
      }

      const currentTowerIds = filteredProfile.towers.map((tower) => tower.id);

      const towersToDisconnect = currentTowerIds.filter(
        (id) => !towers.includes(id)
      );

      const towersToConnect = towers.filter(
        (id) => !currentTowerIds.includes(id)
      );

      const profile = await prisma.profile.update({
        where: {
          organizationId: user.organizationId,
          userId: userId,
        },
        data: {
          role: role,
          towers: {
            disconnect: towersToDisconnect.map((id) => ({ id })),
            connect: towersToConnect.map((id) => ({ id })),
          },
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

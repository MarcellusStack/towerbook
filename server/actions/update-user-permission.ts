"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userPermissionsSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";

export const updateUserPermissions = adminAction(
  userPermissionsSchema,
  async ({ userId, role, towers }, { session }) => {
    try {
      const filteredProfile = await prisma.user.findUnique({
        where: { id: userId, organizationId: session.organizationId },
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

      const profile = await prisma.user.update({
        where: {
          organizationId: session.organizationId,
          id: userId,
        },
        data: {
          role: role as Role[],
          towers: {
            disconnect: towersToDisconnect.map((id) => ({ id })),
            connect: towersToConnect.map((id) => ({ id })),
          },
        },
      });

      if (!profile.id) {
        throw new Error("Couldnt update Permissions");
      }
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde aktualisiert`,
    };
  }
);

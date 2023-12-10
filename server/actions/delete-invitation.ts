"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import { createUserSchema, inviteUserSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";
import { z } from "zod";

export const deleteInvitation = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { user }) => {
    try {
      const invitation = await prisma.invitation.delete({
        where: {
          organizationId: user.organizationId as string,
          id: id,
        },
        select: {
          id: true,
        },
      });

      if (!invitation.id) {
        throw new Error("Einladung konnte nicht gelöscht werden");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen der Einladung");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Einladung wurde gelöscht.`,
    };
  }
);

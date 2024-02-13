"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

export const deleteInvitation = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      const invitation = await clerkClient.invitations.revokeInvitation(id);

      if (!invitation) {
        throw new Error("Fehler beim löschen der Einladung");
      }

      await prisma.invitation.delete({
        where: {
          organizationId: session.organizationId as string,
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen der Einladung");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Einladung wurde gelöscht`,
    };
  }
);

"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import { createUserSchema, inviteUserSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";

export const inviteUser = adminAction(
  inviteUserSchema,
  async ({ email, role }, { user }) => {
    try {
      const invitation = await prisma.invitation.create({
        data: {
          email: email,
          role: role as Role,
          organization: {
            connect: {
              id: user.organizationId as string,
            },
          },
        },
        select: {
          id: true,
        },
      });

      if (!invitation.id) {
        throw new Error("Couldnt invite user");
      }
    } catch (error) {
      throw new Error("Fehler beim Einladen des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde eingeladen.`,
    };
  }
);

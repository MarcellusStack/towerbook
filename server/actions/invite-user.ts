"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import { createUserSchema, inviteUserSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";
import { sendEmail } from "@server/lib/utils/send-email";
import { InviteEmail } from "@/components/emails/invite-email";

export const inviteUser = adminAction(
  inviteUserSchema,
  async ({ email, role }, { user }) => {
    const formattedEmail = email.toLowerCase().trim();
    try {
      await prisma.invitation.create({
        data: {
          email: formattedEmail,
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
    } catch (error) {
      throw new Error("Fehler beim Einladen des Benutzer");
    }

    sendEmail(
      email,
      "Einladung zum Digitales Turmbuch",
      InviteEmail({ organizationName: user.organizationName as string })
    );

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde eingeladen.`,
    };
  }
);

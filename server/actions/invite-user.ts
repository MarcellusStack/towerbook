"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { inviteUserSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { type Role } from "@prisma/client";
import { sendEmail } from "@server/lib/utils/send-email";
import { InviteEmail } from "@/components/emails/invite-email";
import { toLowercaseAndTrim } from "@/utils";

export const inviteUser = adminAction(
  inviteUserSchema,
  async ({ email, role }, { session }) => {
    try {
      await prisma.invitation.create({
        data: {
          email: toLowercaseAndTrim(email),
          role: role as Role,
          organization: {
            connect: {
              id: session.organizationId as string,
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
      InviteEmail({ organizationName: session.organizationName as string })
    );

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde eingeladen`,
    };
  }
);

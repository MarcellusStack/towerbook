"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { inviteUserSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@server/lib/utils/send-email";
import { InviteEmail } from "@/components/emails/invite-email";
import { toLowercaseAndTrim } from "@/utils";

export const inviteUser = authAction("createInvitation")(
  inviteUserSchema,
  async ({ email, permissionId }, { session }) => {
    try {
      await prisma.invitation.create({
        data: {
          email: toLowercaseAndTrim(email),
          organization: {
            connect: {
              id: session.organizationId as string,
            },
          },
          permission: {
            connect: {
              id: permissionId,
            },
          },
        },
        select: {
          id: true,
        },
      });
      /* await sendEmail(
        email,
        "Einladung zum Digitales Turmbuch",
        InviteEmail({ organizationName: session.organizationName as string })
      ); */
    } catch (error) {
      throw new Error("Fehler beim Einladen des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde eingeladen`,
    };
  }
);

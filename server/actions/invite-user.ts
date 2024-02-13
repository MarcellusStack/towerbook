"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { inviteUserSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { baseUrl, toLowercaseAndTrim } from "@/utils";
import { clerkClient } from "@clerk/nextjs";

export const inviteUser = authAction("createInvitation")(
  inviteUserSchema,
  async ({ email, permissionId }, { session }) => {
    try {
      const invitation = await clerkClient.invitations.createInvitation({
        emailAddress: email,
        redirectUrl: `${baseUrl}/sign-up`,
      });

      if (!invitation) {
        throw new Error("Fehler beim Einladen des Benutzers");
      }

      await prisma.invitation.create({
        data: {
          id: invitation.id,
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
    } catch (error) {
      throw new Error("Fehler beim Einladen des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde eingeladen`,
    };
  }
);

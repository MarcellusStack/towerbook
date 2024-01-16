"use server";

import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { action, authAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { adminAction } from "@server/lib/utils/action-clients";
import { sendEmail } from "@server/lib/utils/send-email";
import { v4 as uuidv4 } from "uuid";
import { ResetPasswordEmail } from "@/components/emails/reset-password-email";
import { resetPasswordSchema } from "@/schemas";
import { toLowercaseAndTrim } from "@/utils";

export const deleteAccount = authAction(z.object({}), async ({}, { user }) => {
  try {
    await prisma.$transaction(
      async (tx) => {
        const profile = await tx.profile.findUnique({
          where: { userId: user.id, organizationId: user.organizationId },
          select: {
            id: true,
            userId: true,
            organizationId: true,
            role: true,
          },
        });

        if (!profile) {
          throw new Error("User nicht gefunden");
        }

        if (profile.role.includes("admin")) {
          throw new Error("Sie können als Admin den Account nicht löschen");
        }

        await tx.profile.delete({
          where: {
            id: profile.id,
          },
        });

        const { error } = await supabase.auth.admin.deleteUser(profile.userId);

        if (error) {
          throw new Error("Fehler beim löschen des Accounts");
        }
      },
      {
        maxWait: 15000,
        timeout: 15000,
      }
    );
  } catch (error) {
    throw new Error("Fehler beim löschen des Accounts");
  }

  revalidatePath("/", "layout");

  redirect("/login");
});

export const leaveOrganization = authAction(
  z.object({}),
  async ({}, { user }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const profile = await tx.profile.findUnique({
            where: { userId: user.id, organizationId: user.organizationId },
            select: {
              id: true,
              userId: true,
              organizationId: true,
              role: true,
            },
          });

          if (!profile || !profile.organizationId) {
            throw new Error(
              "User nicht gefunden oder gehört keiner Organisation an"
            );
          }

          if (profile.role.includes("admin") && profile.organizationId) {
            throw new Error(
              "Sie können als Admin die Organisation nicht verlassen"
            );
          }

          await tx.profile.update({
            where: { userId: profile.userId },
            data: {
              organization: {
                disconnect: {
                  id: user.organizationId as string,
                },
              },
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim verlassen der Organisation");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Organisation verlassen`,
    };
  }
);

export const updateEmail = authAction(
  z.object({
    email: z.string().email({
      message: "Keine gültige E-Mail",
    }),
  }),
  async ({ email }, { user }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.profile.update({
            where: { userId: user.id },
            data: {
              email: toLowercaseAndTrim(email),
            },
          });

          const { error } = await supabase.auth.admin.updateUserById(user.id, {
            email: toLowercaseAndTrim(email),
          });

          if (error) {
            throw new Error("Fehler beim aktualisieren der E-Mail Adresse");
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der E-Mail Adresse");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben Ihre E-Mail Adresse aktualisiert`,
    };
  }
);

export const verifyEmail = action(
  z.object({
    userId: z.string().min(1, { message: "User Id wird benötigt" }),
    token: z.string().min(1, { message: "Token wird benötigt" }),
  }),
  async ({ userId, token }) => {
    try {
      await prisma.profile.update({
        where: {
          userId: userId,
          verificationToken: token,
          emailVerified: false,
        },
        data: { emailVerified: true },
      });
    } catch (error) {
      throw new Error("Fehler beim bestätigen der E-Mail Adresse");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben Ihre E-Mail Adresse bestätigt und können sich nun anmelden`,
    };
  }
);

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

export const forgotPassword = action(
  z.object({
    email: z.string().email({
      message: "Keine gültige E-Mail",
    }),
  }),
  async ({ email }) => {
    try {
      const user = await prisma.profile.update({
        where: { email: toLowercaseAndTrim(email) },
        data: {
          passwordResetToken: uuidv4(),
          passwordResetTokenExpires: new Date(
            Date.now() + oneDayInMilliseconds
          ),
        },
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          passwordResetToken: true,
        },
      });

      sendEmail(
        email,
        "Digitales Turmbuch - Passwort zurücksetzen",
        ResetPasswordEmail({
          receiver: `${user.firstName} ${user.lastName}`,
          userId: user.userId,
          token: user.passwordResetToken as string,
        })
      );
    } catch (error) {
      throw new Error("Fehler beim erstellen des Token");
    }

    revalidatePath("/", "layout");

    return {
      message: `E-Mail wurde versendet`,
    };
  }
);

export const resetPassword = action(
  resetPasswordSchema,
  async ({ userId, token, password }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const currentDate = new Date();

          await tx.profile.update({
            where: {
              userId: userId,
              passwordResetToken: token,
              passwordResetTokenExpires: { gte: currentDate },
            },
            data: {
              passwordResetToken: uuidv4(), // set new token so you can't use the old one
              passwordResetTokenExpires: new Date(), // set time to now so you have to request a new token
            },
          });

          const { error } = await supabase.auth.admin.updateUserById(userId, {
            password: password,
          });

          if (error) {
            throw new Error("Fehler beim zurücksetzen des Passworts");
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim zurücksetzen des Passworts");
    }

    revalidatePath("/", "layout");

    return {
      message: `Passwort wurde zurückgesetzt`,
    };
  }
);

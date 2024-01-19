"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { signUpSchema } from "@/schemas";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@server/lib/utils/send-email";
import { VerifyEmail } from "@/components/emails/verify-email";

export const signUp = action(
  signUpSchema,
  async ({ firstName, lastName, email, password }) => {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
      });

      if (error) {
        throw new Error(error.message);
      }

      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.create({
            data: {
              verificationToken: uuidv4(),
              firstName: firstName,
              lastName: lastName,
              email: data.user.email as string,
              id: data.user.id,
            },
            select: {
              verificationToken: true,
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          });

          if (!user) {
            await supabase.auth.admin.deleteUser(data.user.id);
            throw new Error("Fehler beim Erstellen des Profils");
          }

          sendEmail(
            data.user.email as string,
            "Digitales Turmbuch bestätigen sie Ihre E-Mail Adresse",
            VerifyEmail({
              receiver: `${user.firstName} ${user.lastName}`,
              userId: user.id as string,
              token: user.verificationToken as string,
            })
          );
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Profils");
    }

    return {
      message:
        "Sie haben sich registriert und erhalten in kürze eine E-Mail mit einem Bestätigungslink",
    };
  }
);

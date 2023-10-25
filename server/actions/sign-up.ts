"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { signUpSchema } from "@/schemas";

export const signUp = action(
  signUpSchema,
  async ({ firstName, lastName, email, password }) => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        organizationId: "",
      },
    });

    if (error) {
      throw new Error(error);
    }

    try {
      await prisma.profile.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: data.user.email!,
          userId: data.user.id,
        },
      });
    } catch (error) {
      await supabase.auth.admin.deleteUser(data.user.id);
      throw new Error("Fehler beim Erstellen des Profils");
    }

    return "Sie haben sich registriert und können sich nun Anmelden.";
  }
);

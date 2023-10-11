"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { authSchema } from "@/schemas";

export const signUp = action(authSchema, async ({ email, password }) => {
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
        email: data.user.email!,
        userId: data.user.id,
      },
    });
  } catch (error) {
    await supabase.auth.admin.deleteUser(data.user.id);
    throw new Error("Fehler beim Erstellen des Profils");
  }

  return "Sie haben sich registriert und können sich nun Anmelden.";
});

"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { createUserSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";

export const createUser = adminAction(
  createUserSchema,
  async ({ firstName, lastName, email, password, role }, { user }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const { data, error } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
          });

          if (error) {
            throw new Error("Couldnt create user");
          }

          const profile = await tx.profile.create({
            data: {
              userId: data.user.id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              role: new Array(role) as Role[],
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

          if (!profile.id) {
            await supabase.auth.admin.deleteUser(data.user.id);
            throw new Error("Couldnt create profile");
          }
        },
        {
          maxWait: 15000, // default: 2000
          timeout: 15000, // default: 5000
        }
      );
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Benutzer");
    }

    revalidatePath("/", "layout");

    return `Der Benutzer wurde erstellt, ${firstName} ${lastName} kann sich jetzt mit ${email} und seinem Passwort anmelden.`;
  }
);

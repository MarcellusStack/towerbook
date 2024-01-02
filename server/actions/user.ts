"use server";
import { Role } from "@prisma/client";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { authAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

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
    console.log(email);
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.profile.update({
            where: { userId: user.id },
            data: {
              email: email,
            },
          });

          const { error } = await supabase.auth.admin.updateUserById(user.id, {
            email: email,
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

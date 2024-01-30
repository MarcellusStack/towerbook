"use server";

import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { action, authAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

import { toLowercaseAndTrim } from "@/utils";

export const deleteAccount = authAction(
  z.object({}),
  async ({}, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { id: session.id, organizationId: session.organizationId },
            select: {
              id: true,
              organizationId: true,
              role: true,
            },
          });

          if (!user) {
            throw new Error("User nicht gefunden");
          }

          if (user.role.includes("admin")) {
            throw new Error("Sie können als Admin den Account nicht löschen");
          }

          await tx.user.delete({
            where: {
              id: user.id,
            },
          });

          const { error } = await supabase.auth.admin.deleteUser(user.id);

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
  }
);

export const leaveOrganization = authAction(
  z.object({}),
  async ({}, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { id: session.id, organizationId: session.organizationId },
            select: {
              id: true,
              organizationId: true,
              role: true,
            },
          });

          if (!user || !user.organizationId) {
            throw new Error(
              "User nicht gefunden oder gehört keiner Organisation an"
            );
          }

          if (user.role.includes("admin") && user.organizationId) {
            throw new Error(
              "Sie können als Admin die Organisation nicht verlassen"
            );
          }

          await tx.user.update({
            where: { id: user.id },
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
  async ({ email }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.user.update({
            where: { id: session.id },
            data: {
              email: toLowercaseAndTrim(email),
            },
          });

          const { error } = await supabase.auth.admin.updateUserById(
            session.id,
            {
              email: toLowercaseAndTrim(email),
            }
          );

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

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

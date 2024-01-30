"use server";
import { prisma } from "@server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { onboardingSchema } from "@/schemas";
import { clerkClient } from "@clerk/nextjs";

export const createUser = authAction(
  onboardingSchema,
  async ({ firstName, lastName, birthDate }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.create({
            data: {
              id: session.id,
              firstName: firstName,
              lastName: lastName,
              email: session.email,
              birthDate: birthDate,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          });

          if (!user) {
            throw new Error("Fehler beim Onboarding");
          }

          await clerkClient.users.updateUserMetadata(session.id, {
            publicMetadata: {
              firstName: firstName,
              lastName: lastName,
              birthDate: birthDate,
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim Onboarding");
    }

    return {
      message:
        "Ihre Daten wurden gespeichert. Bitte erstellen oder wählen Sie eine Organisation aus.",
    };
  }
);

"use server";
import { prisma } from "@server/db";
import { action } from "@/server/lib/utils/action-clients";
import { onboardingSchema } from "@/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs";

//since we are using clerk we have to synchronize the clerk user with the prisma user
//we create a new user when the user enters data for the onboarding
export const createUser = action(
  onboardingSchema,
  async ({ firstName, lastName, birthDate }) => {
    try {
      const auth = await currentUser();

      if (!auth) {
        throw new Error("Nicht authentifiziert");
      }

      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.create({
            data: {
              id: auth.id,
              firstName: firstName,
              lastName: lastName,
              email: auth?.emailAddresses[0]?.emailAddress,
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

          await clerkClient.users.updateUserMetadata(auth.id, {
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

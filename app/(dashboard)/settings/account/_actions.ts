"use server";
import { accountSchema } from "@/schemas";
import { authAction } from "@/server/lib/utils/action-clients";
import { encrypt } from "@/utils";
import { clerkClient } from "@clerk/nextjs";
import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import {
  decryptUserAccount,
  userAccountQuery,
} from "@users/[id]/account/_actions";
import { revalidatePath } from "next/cache";

export const getUserSettingsAccount = authQuery(async (session) => {
  const userAccount = await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: session.id,
    },
    select: {
      gender: true,
      firstName: true,
      lastName: true,
      salutation: true,
      title: true,
      birthName: true,
      birthDate: true,
      birthPlace: true,
      street: true,
      houseNumber: true,
      zipCode: true,
      location: true,
      email: true,
      phone: true,
      drkMember: true,
      drkMemberLocation: true,
      emergencyContactLastName: true,
      emergencyContactFirstName: true,
      emergencyContactPhone: true,
      bankName: true,
      iban: true,
      bic: true,
      differentBankholder: true,
      id: true,
    },
  });

  if (!userAccount) {
    throw new Error("Benutzer nicht gefunden");
  }

  const decryptedUserAccount = await decryptUserAccount(userAccount);

  return decryptedUserAccount;
});

export type UserAccountProps = NonNullable<
  Awaited<ReturnType<typeof userAccountQuery>>
>;

export const updateUserSettingsAccount = authAction()(
  accountSchema,
  async (
    {
      gender,
      firstName,
      lastName,
      salutation,
      title,
      birthName,
      birthDate,
      birthPlace,
      street,
      houseNumber,
      zipCode,
      location,
      phone,
      drkMember,
      drkMemberLocation,
      emergencyContactLastName,
      emergencyContactFirstName,
      emergencyContactPhone,
      bankName,
      iban,
      bic,
      differentBankholder,
    },
    { session }
  ) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.update({
            where: {
              organizationId: session.organizationId,
              id: session.id,
            },
            data: {
              gender: gender,
              firstName: firstName,
              lastName: lastName,
              salutation: salutation,
              title: title,
              birthName: birthName,
              birthDate: new Date(birthDate as Date),
              birthPlace: birthPlace,
              street: street,
              houseNumber: houseNumber,
              zipCode: zipCode,
              location: location,
              phone: phone,
              drkMember: drkMember,
              drkMemberLocation: drkMemberLocation,
              emergencyContactLastName: emergencyContactLastName,
              emergencyContactFirstName: emergencyContactFirstName,
              emergencyContactPhone: emergencyContactPhone,
              bankName: bankName,
              iban: encrypt(iban),
              bic: encrypt(bic),
              differentBankholder: differentBankholder,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              birthDate: true,
            },
          });

          if (!user) {
            throw new Error("Benutzer konnte nicht aktualisiert werden");
          }

          const syncClerkAccount = await clerkClient.users.updateUser(user.id, {
            publicMetadata: {
              firstName: user.firstName,
              lastName: user.lastName,
              birthDate: user.birthDate,
            },
          });

          if (!syncClerkAccount) {
            throw new Error("Benutzer konnte nicht aktualisiert werden");
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde aktualisiert`,
    };
  }
);

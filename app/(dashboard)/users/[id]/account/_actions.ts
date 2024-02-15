"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { decrypt } from "@/utils";

export const decryptUserAccount = async (userAccount: UserAccountProps) => {
  const decryptedIban = decrypt(userAccount.iban || "");
  const decryptedBic = decrypt(userAccount.bic || "");

  return {
    ...userAccount,
    iban: decryptedIban,
    bic: decryptedBic,
  };
};

export const userAccountQuery = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
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
});

export const getUserAccount = authFilterQuery(async (search, session) => {
  const userAccount = await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
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
      drkEmployee: true,
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
}, "readUser");

export type UserAccountProps = NonNullable<
  Awaited<ReturnType<typeof userAccountQuery>>
>;

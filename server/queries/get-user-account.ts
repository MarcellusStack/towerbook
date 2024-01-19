import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type User, Role } from "@prisma/client";
import { decrypt } from "@/utils";

export type UserAccountProps = Pick<
  User,
  | "id"
  | "gender"
  | "firstName"
  | "lastName"
  | "salutation"
  | "title"
  | "birthName"
  | "birthDate"
  | "birthPlace"
  | "street"
  | "houseNumber"
  | "zipCode"
  | "location"
  | "email"
  | "phone"
  | "drkMember"
  | "drkMemberLocation"
  | "emergencyContactLastName"
  | "emergencyContactFirstName"
  | "emergencyContactPhone"
  | "bankName"
  | "iban"
  | "bic"
  | "differentBankholder"
>;

export const decryptUserAccount = async (
  userAccount: UserAccountProps
): Promise<UserAccountProps> => {
  const decryptedIban = decrypt(userAccount.iban || "");
  const decryptedBic = decrypt(userAccount.bic || "");

  return {
    ...userAccount,
    iban: decryptedIban,
    bic: decryptedBic,
  };
};

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
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserAccountProps>;

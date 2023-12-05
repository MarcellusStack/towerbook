import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Profile, Role } from "@prisma/client";

export type UserAccountProps = Pick<
  Profile,
  | "userId"
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

export const getUserAccount = authFilterQuery(async (search, user) => {
  return await prisma.profile.findFirst({
    where: {
      organizationId: user.organizationId,
      userId: search,
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
      userId: true,
    },
  });
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserAccountProps>;

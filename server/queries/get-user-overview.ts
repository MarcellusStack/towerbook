import { prisma } from "@server/db";
import { type Role } from "@prisma/client";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { ExtendProfileWithTowerProps } from "@/type";

export type UserOverviewProps = Pick<
  ExtendProfileWithTowerProps,
  | "firstName"
  | "lastName"
  | "title"
  | "birthDate"
  | "email"
  | "phone"
  | "towers"
>;

export const getUserOverview = authFilterQuery(async (search, user) => {
  return await prisma.profile.findFirst({
    where: {
      organizationId: user.organizationId,
      userId: search,
    },
    select: {
      firstName: true,
      lastName: true,
      title: true,
      birthDate: true,
      email: true,
      phone: true,
      towers: true,
      //add dutyplan when its available
    },
  });
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserOverviewProps>;

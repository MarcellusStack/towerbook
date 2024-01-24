"use server";
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

export const getUserOverview = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      firstName: true,
      lastName: true,
      title: true,
      birthDate: true,
      email: true,
      phone: true,
      towers: true,
      shifts: {
        select: {
          id: true,
          type: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserOverviewProps>;

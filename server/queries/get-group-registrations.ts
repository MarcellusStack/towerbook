import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role, GroupRegistration, Tower } from "@prisma/client";

export type GroupRegistrationProps = Pick<
  GroupRegistration,
  | "id"
  | "date"
  | "time"
  | "name"
  | "count"
  | "supervisorFirstName"
  | "supervisorLastName"
>;

export type ExtendGroupRegistrationWithTowerProps = GroupRegistrationProps & {
  tower: Pick<Tower, "name" | "number">;
};

export const getGroupRegistrations = authFilterQuery(async (search, user) => {
  return await prisma.groupRegistration.findMany({
    where: {
      organizationId: user.organizationId as string,
    },
    select: {
      id: true,
      date: true,
      time: true,
      name: true,
      count: true,
      supervisorFirstName: true,
      supervisorLastName: true,
      tower: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
    },
  });
}) as (
  search: string,
  requiredRoles: Role[]
) => Promise<ExtendGroupRegistrationWithTowerProps[]>;

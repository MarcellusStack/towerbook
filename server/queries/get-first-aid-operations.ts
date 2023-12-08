import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role, FirstAidOperation, Tower, Profile } from "@prisma/client";

export type FirstAidOperationProps = Pick<
  FirstAidOperation,
  "id" | "status" | "type" | "date"
>;

export type ExtendFirstAidOperationsWithRelationProps =
  FirstAidOperationProps & {
    tower: Pick<Tower, "name" | "number">;
    guardLeader: Pick<Profile, "firstName" | "lastName">;
  };

export const getFirstAidOperations = authFilterQuery(async (search, user) => {
  return await prisma.firstAidOperation.findMany({
    where: {
      organizationId: user.organizationId as string,
    },
    select: {
      id: true,
      status: true,
      date: true,
      type: true,
      tower: {
        select: {
          name: true,
          number: true,
        },
      },
      guardLeader: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}) as (
  search: string,
  requiredRoles: Role[]
) => Promise<ExtendFirstAidOperationsWithRelationProps[]>;

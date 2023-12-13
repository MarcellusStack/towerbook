import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role, FirstAidOperation, Tower, Profile } from "@prisma/client";
import { type FirstAidOperationProps } from "@server/queries/get-first-aid-operations";

export type ExtendFirstAidOperationsWithGuardLeaderProps =
  FirstAidOperationProps & {
    guardLeader: Pick<Profile, "firstName" | "lastName">;
  };

export const getTowerFirstAidOperations = authFilterQuery(
  async (search, user) => {
    return await prisma.firstAidOperation.findMany({
      where: {
        organizationId: user.organizationId as string,
        towerId: search,
      },
      select: {
        id: true,
        status: true,
        date: true,
        type: true,
        guardLeader: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
) as (
  search: string,
  requiredRoles: Role[]
) => Promise<ExtendFirstAidOperationsWithGuardLeaderProps[]>;

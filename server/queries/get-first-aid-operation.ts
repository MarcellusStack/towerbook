import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import {
  type Tower,
  type Role,
  type FirstAidOperation,
  type Profile,
} from "@prisma/client";
import { cache } from "react";

export type FirstAidOperationProps = FirstAidOperation;

export type ExtendFirstAidOperationWithRelationProps =
  FirstAidOperationProps & {
    tower: Pick<Tower, "name" | "number" | "location">;
    guardLeader: Pick<Profile, "firstName" | "lastName">;
  };

export const getFirstAidOperation = cache(
  authFilterQuery(async (search, user) => {
    return await prisma.firstAidOperation.findFirst({
      where: {
        id: search,
        organizationId: user.organizationId as string,
      },
      include: {
        guardLeader: { select: { firstName: true, lastName: true } },
        tower: {
          select: { name: true, location: true, number: true },
        },
      },
    });
  }) as unknown as (
    search: string,
    requiredRoles: Role[]
  ) => Promise<ExtendFirstAidOperationWithRelationProps>
);

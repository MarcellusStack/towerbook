"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role, FirstAidOperation, Tower, User } from "@prisma/client";
import { type FirstAidOperationProps } from "@server/queries/get-first-aid-operations";
import { cache } from "react";

export type ExtendFirstAidOperationsWithGuardLeaderProps =
  FirstAidOperationProps & {
    guardLeader: Pick<User, "firstName" | "lastName">;
  };

export const getTowerFirstAidOperations = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.firstAidOperation.findMany({
      where: {
        organizationId: session.organizationId as string,
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
  })
) as (
  search: string,
  requiredRoles: Role[]
) => Promise<ExtendFirstAidOperationsWithGuardLeaderProps[]>;

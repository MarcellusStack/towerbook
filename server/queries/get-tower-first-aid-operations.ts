"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

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
        startTime: true,
        type: true,
        guardLeader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        helper: {
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }, "readProtocol")
);

export type TowerFirstAidOperationsProps = NonNullable<
  Awaited<ReturnType<typeof getTowerFirstAidOperations>>
>;

export type TowerFirstAidOperationProps = NonNullable<
  Awaited<ReturnType<typeof getTowerFirstAidOperations>>
>[0];

"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getFirstAidOperations = authFilterQuery(
  async (search, session) => {
    return await prisma.firstAidOperation.findMany({
      where: {
        organizationId: session.organizationId as string,
      },
      select: {
        id: true,
        status: true,
        date: true,
        startTime: true,
        type: true,
        tower: {
          select: {
            id: true,
            name: true,
            number: true,
          },
        },
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
  },
  "readProtocol"
);

export type FirstAidOperationsProps = NonNullable<
  Awaited<ReturnType<typeof getFirstAidOperations>>
>;

export type FirstAidOperationProps = NonNullable<
  Awaited<ReturnType<typeof getFirstAidOperations>>
>[0];

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
  },
  "readProtocol"
);

export type FirstAidOperationsProps = NonNullable<
  Awaited<ReturnType<typeof getFirstAidOperations>>
>;

export type FirstAidOperationProps = NonNullable<
  Awaited<ReturnType<typeof getFirstAidOperations>>
>[0];

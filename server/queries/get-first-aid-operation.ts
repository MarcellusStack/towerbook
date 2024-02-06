"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getFirstAidOperation = authFilterQuery(async (search, session) => {
  return await prisma.firstAidOperation.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId as string,
    },
    include: {
      guardLeader: { select: { firstName: true, lastName: true, id: true } },
      tower: { select: { name: true, location: true, number: true } },
    },
  });
}, "readProtocol");

export type FirstAidOperationProps = NonNullable<
  Awaited<ReturnType<typeof getFirstAidOperation>>
>;

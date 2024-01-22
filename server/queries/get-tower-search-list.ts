"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerSearchLists = authFilterQuery(async (search, session) => {
  return await prisma.searchList.findMany({
    where: {
      organizationId: session.organizationId as string,
      towerId: search,
    },
    select: {
      id: true,
      status: true,
      date: true,
      timeSearched: true,
      firstName: true,
      lastName: true,
      timeFound: true,
      handOverTo: true,
    },
  });
});

export type TowerSearchListsProps = NonNullable<
  Awaited<ReturnType<typeof getTowerSearchLists>>
>;

export type TowerSearchListProps = NonNullable<
  Awaited<ReturnType<typeof getTowerSearchLists>>
>[0];

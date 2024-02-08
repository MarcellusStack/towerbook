"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getSearchLists = authFilterQuery(async (search, session) => {
  return await prisma.searchList.findMany({
    where: {
      organizationId: session.organizationId as string,
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
      tower: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
    },
  });
}, "readProtocol");

export type SearchListsProps = NonNullable<
  Awaited<ReturnType<typeof getSearchLists>>
>;

export type SearchListProps = NonNullable<
  Awaited<ReturnType<typeof getSearchLists>>
>[0];

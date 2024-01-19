import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role } from "@prisma/client";
import { SearchListProps } from "@server/queries/get-search-list";

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
}) as (search: string, requiredRoles: Role[]) => Promise<SearchListProps[]>;

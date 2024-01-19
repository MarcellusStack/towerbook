import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role } from "@prisma/client";
import { ExtendSearchListWithTowerProps } from "@server/queries/get-search-list";

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
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<ExtendSearchListWithTowerProps[]>;

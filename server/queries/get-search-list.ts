import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay, SearchList } from "@prisma/client";
import { cache } from "react";

export type SearchListProps = Pick<
  SearchList,
  | "id"
  | "date"
  | "timeSearched"
  | "firstName"
  | "lastName"
  | "description"
  | "timeFound"
  | "handOver"
  | "handOverTo"
>;

export type ExtendSearchListWithTowerProps = SearchListProps & {
  tower: Pick<Tower, "name" | "number" | "location">;
};

export const getSearchList = cache(
  authFilterQuery(async (search, user) => {
    return await prisma.searchList.findFirst({
      where: {
        id: search,
        organizationId: user.organizationId as string,
      },
      select: {
        id: true,
        date: true,
        timeSearched: true,
        firstName: true,
        lastName: true,
        description: true,
        timeFound: true,
        handOver: true,
        handOverTo: true,
        tower: { select: { name: true, location: true, number: true } },
      },
    });
  }) as unknown as (
    search: string,
    requiredRoles: Role[]
  ) => Promise<ExtendSearchListWithTowerProps>
);

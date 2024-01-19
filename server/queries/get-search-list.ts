import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role, TowerDay, SearchList } from "@prisma/client";
import { cache } from "react";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

export type SearchListProps = Pick<
  SearchList,
  | "id"
  | "status"
  | "date"
  | "timeSearched"
  | "firstName"
  | "lastName"
  | "age"
  | "description"
  | "timeFound"
  | "handOverTo"
>;

export type ExtendSearchListWithTowerProps = SearchListProps & {
  tower: Pick<Tower, "name" | "number" | "location">;
};

export const getSearchList = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.searchList.findFirst({
      where: {
        id: search,
        organizationId: session.organizationId as string,
      },
      select: {
        id: true,
        status: true,
        date: true,
        timeSearched: true,
        firstName: true,
        lastName: true,
        age: true,
        stature: true,
        height: true,
        clothing: true,
        previousIllness: true,
        firstNameReportingPerson: true,
        lastNameReportingPerson: true,
        phoneReportingPerson: true,
        description: true,

        lastSeen: true,
        lastLocation: true,
        informationPolice: true,
        informationFireDepartment: true,
        informationBeachVogt: true,
        chainDiving: true,
        searchQuad: true,
        beachPatrol: true,
        searchByBoat: true,
        searchByDrone: true,
        searchRWC: true,
        supportOtherBeachArea: true,
        timeFound: true,
        handOverTo: true,
        lifeguard: { select: { id: true, firstName: true, lastName: true } },
        tower: { select: { name: true, location: true, number: true } },
      },
    });
  }) as unknown as (
    search: string,
    requiredRoles: Role[]
  ) => Promise<ExtendSearchListWithTowerProps>
);

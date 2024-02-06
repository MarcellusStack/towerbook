"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getSearchListLayout = authFilterQuery(async (search, session) => {
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
}, "readProtocol");

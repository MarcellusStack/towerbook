"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getTowerGroupRegistrations = authFilterQuery(
  async (search, session) => {
    return await prisma.groupRegistration.findMany({
      where: {
        organizationId: session.organizationId as string,
        towerId: search,
      },
      select: {
        id: true,
        date: true,
        time: true,
        name: true,
        count: true,
        supervisorFirstName: true,
        supervisorLastName: true,
      },
    });
  },
  "readProtocol"
);

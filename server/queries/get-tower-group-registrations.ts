"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role } from "@prisma/client";
import { GroupRegistrationProps } from "@server/queries/get-group-registrations";

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
  }
);

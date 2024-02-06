"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getGroupRegistrations = authFilterQuery(
  async (search, session) => {
    return await prisma.groupRegistration.findMany({
      where: {
        organizationId: session.organizationId as string,
      },
      select: {
        id: true,
        date: true,
        time: true,
        name: true,
        count: true,
        supervisorFirstName: true,
        supervisorLastName: true,
        tower: {
          select: {
            id: true,
            name: true,
            number: true,
          },
        },
      },
    });
  },
  "readProtocol"
);

export type GroupRegistrationsProps = NonNullable<
  Awaited<ReturnType<typeof getGroupRegistrations>>
>;

export type GroupRegistrationProps = NonNullable<
  Awaited<ReturnType<typeof getGroupRegistrations>>
>[0];

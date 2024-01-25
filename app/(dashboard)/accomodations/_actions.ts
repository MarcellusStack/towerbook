"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

export const getAccomodations = authFilterQuery(async (search, session) => {
  return await prisma.accomodation.findMany({
    where: {
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      number: true,
      name: true,
      street: true,
      zipCode: true,
      location: true,
      availableBeds: true,
      reservable: true,
    },
  });
});

export type AccomodationsProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodations>>
>;

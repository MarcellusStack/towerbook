"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

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

export const getAccomodation = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.accomodation.findFirst({
      where: {
        organizationId: session.organizationId as string,
        id: search,
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
        bookings: {
          select: {
            id: true,
            date: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  })
);

export type AccomodationsProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodations>>
>;

export type AccomodationProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodation>>
>;

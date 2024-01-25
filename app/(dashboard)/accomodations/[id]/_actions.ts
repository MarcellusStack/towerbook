"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getAccomodation = authFilterQuery(async (search, session) => {
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
});

export const getAccomodationBookings = authFilterQuery(
  async (search, session) => {
    return await prisma.accomodation.findFirst({
      where: {
        organizationId: session.organizationId as string,
        id: search,
      },
      select: {
        id: true,
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
  }
);

export type AccomodationProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodation>>
>;

export type AccomodationBookingsProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodationBookings>>
>;

"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getAccomodation = authFilterQuery(async (search, session) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
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
        where: {
          status: {
            not: "canceled",
          },
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
          date: true,
          status: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
}, "readAccomodation");

export const getAccomodationBookings = authFilterQuery(
  async (search, session) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await prisma.accomodation.findFirst({
      where: {
        organizationId: session.organizationId as string,
        id: search,
      },
      select: {
        id: true,
        availableBeds: true,
        bookings: {
          where: {
            status: {
              not: "canceled",
            },
            date: {
              gte: today,
            },
          },
          select: {
            id: true,
            date: true,
            status: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  },
  "readBooking"
);

export type AccomodationProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodation>>
>;

export type AccomodationBookingsProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodationBookings>>
>;

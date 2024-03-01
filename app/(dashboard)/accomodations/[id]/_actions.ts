"use server";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { convertDate } from "@/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

export const confirmBooking = authAction("updateBooking")(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.booking.update({
        where: { id: id, organizationId: session.organizationId },
        data: { status: "confirmed" },
      });
    } catch (error) {
      throw new Error(
        "Die Buchung konnte nicht bestätigt werden, bitte versuchen Sie es erneut"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Buchung bestätigt`,
    };
  }
);

export const deleteBooking = authAction("deleteBooking")(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.booking.deleteMany({
        where: {
          id: id,
          organizationId: session.organizationId,
          status: {
            not: "confirmed",
          },
        },
      });
    } catch (error) {
      throw new Error(
        "Die Buchung konnte nicht gelöscht werden, bitte versuchen Sie es erneut"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Buchung gelöscht`,
    };
  }
);

export const cancelBooking = authAction("updateBooking")(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.booking.update({
        where: {
          id: id,
          organizationId: session.organizationId,
          status: "confirmed",
        },
        data: { status: "canceled" },
      });
    } catch (error) {
      throw new Error(
        "Die Buchung konnte nicht storniert werden, bitte versuchen Sie es erneut"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Buchung storniert`,
    };
  }
);

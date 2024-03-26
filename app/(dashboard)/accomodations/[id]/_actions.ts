"use server";

import {
  bookSchema,
  deleteSchema,
  multipleBookSchema,
  requestCancelBookingSchema,
} from "@/schemas";
import {} from "@/utils";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { convertDate, formatDateTimeZone } from "@/utils";
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
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
          date: true,
          status: true,
          cancelComment: true,
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
    take: 100,
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
      take: 100,
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
        where: {
          id: id,
          organizationId: session.organizationId,
          accomodation: {
            reservable: true,
          },
        },
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
            notIn: ["confirmed", "request_canceled"],
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
          status: {
            in: ["confirmed", "request_canceled"],
          },
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

export const requestCancelBooking = authAction("")(
  requestCancelBookingSchema,
  async ({ id, cancelComment }, { session }) => {
    try {
      await prisma.booking.update({
        where: {
          id: id,
          userId: session.id,
          organizationId: session.organizationId,
          status: {
            equals: "confirmed",
          },
        },
        data: { status: "request_canceled", cancelComment: cancelComment },
      });
    } catch (error) {
      throw new Error(
        "Die Buchung konnte nicht storniert werden, bitte versuchen Sie es erneut"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben eine Stornierungsanfrage gesendet`,
    };
  }
);

export const deleteUserBooking = authAction("")(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.booking.deleteMany({
        where: {
          id: id,
          userId: session.id,
          organizationId: session.organizationId,
          status: {
            notIn: ["confirmed", "request_canceled"],
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

export const createBooking = authAction("createBooking")(
  bookSchema,
  async ({ date, accomodationId, users }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const accomodation = await tx.accomodation.findUnique({
            where: { id: accomodationId, reservable: true },
            select: { availableBeds: true },
          });

          if (!accomodation) {
            throw new Error("Unterkunft nicht gefunden");
          }

          const bookedBedsCount = await tx.booking.count({
            where: {
              date: formatDateTimeZone(new Date(date)),
              status: {
                not: "canceled",
              },
              accomodationId: accomodationId,
            },
          });

          const totalBedsNeeded =
            bookedBedsCount + (users.length > 0 ? users.length : 1);

          if (totalBedsNeeded > accomodation.availableBeds) {
            throw new Error("Es sind keine Betten mehr verfügbar");
          }

          if (users.length > 0) {
            await Promise.all(
              users.map((userId) =>
                tx.booking.create({
                  data: {
                    organization: { connect: { id: session.organizationId } },
                    date: formatDateTimeZone(new Date(date)),
                    accomodation: { connect: { id: accomodationId } },
                    user: { connect: { id: userId } },
                  },
                })
              )
            );
          } else {
            await tx.booking.create({
              data: {
                organization: { connect: { id: session.organizationId } },
                date: formatDateTimeZone(new Date(date)),
                accomodation: { connect: { id: accomodationId } },
                user: { connect: { id: session.id } },
              },
            });
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error(
        "Eine Buchung für dieses Datum ist nicht möglich da sie schon ausgebucht ist oder die Unterkunft nicht reservierbar ist"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben für den ${convertDate(date)} gebucht`,
    };
  }
);

export const createMultipleBooking = authAction("createBooking")(
  multipleBookSchema,
  async ({ startDate, endDate, accomodationId, users }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const accomodation = await tx.accomodation.findUnique({
            where: { id: accomodationId, reservable: true },
            select: { availableBeds: true },
          });

          if (!accomodation) {
            throw new Error("Unterkunft nicht gefunden");
          }

          const start = new Date(startDate);
          const end = new Date(endDate);

          for (
            let date = start;
            date <= end;
            date.setDate(date.getDate() + 1)
          ) {
            const bookedBedsCount = await tx.booking.count({
              where: {
                date: formatDateTimeZone(new Date(date)),
                status: {
                  not: "canceled",
                },
                accomodationId: accomodationId,
              },
            });

            const totalBedsNeeded =
              bookedBedsCount + (users.length > 0 ? users.length : 1);

            if (totalBedsNeeded > accomodation.availableBeds) {
              throw new Error("Es sind keine Betten mehr verfügbar");
            }

            if (users.length > 0) {
              await Promise.all(
                users.map((userId) =>
                  tx.booking.create({
                    data: {
                      organization: { connect: { id: session.organizationId } },
                      date: formatDateTimeZone(new Date(date)),
                      accomodation: { connect: { id: accomodationId } },
                      user: { connect: { id: userId } },
                    },
                  })
                )
              );
            } else {
              await tx.booking.create({
                data: {
                  organization: { connect: { id: session.organizationId } },
                  date: formatDateTimeZone(new Date(date)),
                  accomodation: { connect: { id: accomodationId } },
                  user: { connect: { id: session.id } },
                },
              });
            }
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error(
        "Eine Buchung für dieses Datum ist nicht möglich da sie schon ausgebucht ist oder die Unterkunft nicht reservierbar ist"
      );
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben für den Zeitraum vom ${convertDate(
        startDate
      )} bis zum ${convertDate(endDate)} gebucht`,
    };
  }
);

/* export const deleteBooking = authAction("deleteBooking")(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: id, userId: session.id },
      });

      if (!booking) {
        throw new Error("Buchung nicht gefunden");
      }

      if (booking.status !== "open") {
        await prisma.booking.delete({
          where: { id: id, userId: session.id },
        });
      }
    } catch (error) {
      throw new Error("Fehler beim löschen der Buchung");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Buchung gelöscht`,
    };
  }
); */

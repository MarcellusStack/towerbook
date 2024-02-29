"use server";
import { authAction } from "@server/lib/utils/action-clients";
import { prisma } from "@server/db";
import { revalidatePath } from "next/cache";
import { bookSchema, deleteSchema } from "@/schemas";
import { convertDate, formatDateTimeZone } from "@/utils";

export const createBooking = authAction("createBooking")(
  bookSchema,
  async ({ date, accomodationId }, { session }) => {
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
              accomodationId: accomodationId,
            },
          });

          if (bookedBedsCount >= accomodation.availableBeds) {
            throw new Error("Es sind keine Betten mehr verfügbar");
          }

          await tx.booking.create({
            data: {
              date: formatDateTimeZone(new Date(date)),
              accomodation: { connect: { id: accomodationId } },
              user: {
                connect: { id: session.id },
              },
            },
          });
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

export const deleteBooking = authAction("deleteBooking")(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: id, userId: session.id },
      });

      if (!booking) {
        throw new Error("Buchung nicht gefunden");
      }

      if (booking.status !== "completed") {
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
);

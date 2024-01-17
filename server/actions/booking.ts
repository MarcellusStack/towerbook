"use server";
import { authAction } from "@server/lib/utils/action-clients";
import { prisma } from "@server/db";
import { revalidatePath } from "next/cache";
import { bookSchema } from "@/schemas";
import { convertDate, formatDateTimeZone } from "@/utils";

export const book = authAction(
  bookSchema,
  async ({ date, accomodationId }, { user }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const accomodation = await tx.accomodation.findUnique({
            where: { id: accomodationId },
            select: { availableBeds: true },
          });

          if (!accomodation) {
            throw new Error("Unterkunft nicht gefunden");
          }

          const bookedBedsCount = await tx.booking.count({
            where: {
              date,
              accomodationId,
            },
          });

          if (bookedBedsCount >= accomodation.availableBeds) {
            throw new Error("Es sind keine Betten mehr verfügbar");
          }

          await tx.booking.create({
            data: {
              date: formatDateTimeZone(new Date(date)),
              accomodation: { connect: { id: accomodationId } },
              user: { connect: { userId: user.id } },
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Fehler beim Buchen");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben für den ${convertDate(date)} gebucht`,
    };
  }
);

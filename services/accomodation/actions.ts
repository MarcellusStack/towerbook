"use server";

import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createAccomodationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const createAccomodation = adminAction(
  createAccomodationSchema,
  async (
    { number, name, street, zipCode, location, availableBeds },
    { session }
  ) => {
    try {
      await prisma.accomodation.create({
        data: {
          number: number,
          name: name,
          street: street,
          zipCode: zipCode,
          location: location,
          availableBeds: availableBeds,
          organization: {
            connect: {
              id: session.organizationId as string,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim erstellen des Zimmer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Das Zimmer wurde erstellt`,
    };
  }
);

"use server";
import { createAccomodationSchema, updateAccomodationSchema } from "@/schemas";
import { authAction } from "@/server/lib/utils/action-clients";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { revalidatePath } from "next/cache";

export const getAccomodations = authFilterQuery(async (search, session) => {
  return await prisma.accomodation.findMany({
    where: {
      organizationId: session.organizationId as string,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { number: { equals: Number(search) } },
        ],
      }),
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
}, "readAccomodation");

export type AccomodationsProps = NonNullable<
  Awaited<ReturnType<typeof getAccomodations>>
>;

export const updateAccomodation = authAction("updateAccomodation")(
  updateAccomodationSchema,
  async (
    { id, number, name, street, zipCode, location, availableBeds },
    { session }
  ) => {
    try {
      await prisma.accomodation.update({
        where: { id: id, organizationId: session.organizationId as string },
        data: {
          number: number,
          name: name,
          street: street,
          zipCode: zipCode,
          location: location,
          availableBeds: availableBeds,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Unterkunft");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Unterkunft wurde aktualisiert`,
    };
  }
);

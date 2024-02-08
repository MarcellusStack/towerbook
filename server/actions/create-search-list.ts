"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { createSearchListSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const createSearchList = authAction("createProtocol")(
  createSearchListSchema,
  async ({ date, timeSearched, firstName, lastName, towerId }, { session }) => {
    try {
      await prisma.searchList.create({
        data: {
          date: new Date(date as Date),
          timeSearched: extractTimeFromDate(timeSearched),
          firstName: firstName,
          lastName: lastName,
          lifeguard: { connect: { id: session.id } },
          tower: { connect: { id: towerId } },
          organization: { connect: { id: session.organizationId as string } },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Sucheintrag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Sucheintrag wurde erstellt` };
  }
);

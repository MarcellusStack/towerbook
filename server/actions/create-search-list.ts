"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createSearchListSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const createSearchList = adminAction(
  createSearchListSchema,
  async ({ date, timeSearched, firstName, lastName, towerId }, { user }) => {
    try {
      const searchlist = await prisma.searchList.create({
        data: {
          date: new Date(date as Date),
          timeSearched: extractTimeFromDate(timeSearched),
          firstName: firstName,
          lastName: lastName,
          lifeguard: { connect: { id: user.profileId } },
          tower: { connect: { id: towerId } },
          organization: { connect: { id: user.organizationId as string } },
        },
        select: {
          id: true,
        },
      });

      if (!searchlist.id) {
        throw new Error("Couldnt create searchlist");
      }
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Sucheintrag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Sucheintrag wurde erstellt.` };
  }
);

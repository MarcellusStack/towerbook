"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { searchListSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const updateSearchList = adminAction(
  searchListSchema,
  async ({ id, description, timeFound, handOver, handOverTo }, { user }) => {
    try {
      const searchlist = await prisma.searchList.update({
        where: {
          organizationId: user.organizationId as string,
          id: id,
        },
        data: {
          description: description,
          timeFound:
            timeFound === null ? new Date() : extractTimeFromDate(timeFound),

          handOverTo: handOverTo,
        },
        select: { id: true },
      });
      console.log("After update");

      if (!searchlist.id) {
        throw new Error("Couldnt update searchlist");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Sucheintrag wurde aktualisiert.`,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Fehler beim aktualisieren des Sucheintrag");
    }
  }
);

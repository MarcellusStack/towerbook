"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayFormStatusSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const completeSearchList = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { user }) => {
    try {
      const searchlist = await prisma.searchList.findUnique({
        where: {
          id: id,
          /* organizationId: user.organizationId as string,
          status: { not: "completed" }, */
        },
        select: {
          id: true,
          timeFound: true,
          handOverTo: true,
        },
      });

      if (!searchlist) {
        throw new Error("Couldnt find searchlist");
      }

      if (!searchlist.handOverTo) {
        await prisma.searchList.update({
          where: { id: id },
          data: {
            status: "incomplete",
          },
        });
        revalidatePath("/", "layout");
        throw new Error("Handover to is missing");
      }

      await prisma.searchList.update({
        where: { id: id },
        data: {
          status: "completed",
        },
      });

      revalidatePath("/", "layout");

      return {
        message: `Der Sucheintrag wurde abgeschlossen`,
      };
    } catch (error) {
      throw new Error("Fehler beim abschließen des Sucheintrag.");
    }
  }
);

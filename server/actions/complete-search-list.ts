"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const completeSearchList = authAction("completeProtocol")(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { session }) => {
    try {
      const searchlist = await prisma.searchList.findUnique({
        where: {
          id: id,
          organizationId: session.organizationId as string,
          status: { not: "completed" },
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

      await prisma.revision.deleteMany({
        where: {
          modelId: searchlist.id,
        },
      });

      if (!searchlist.handOverTo) {
        await prisma.searchList.update({
          where: { id: id },
          data: {
            status: "incomplete",
          },
        });
        revalidatePath("/", "layout");
        return {
          message: `Der Sucheintrag wurde aktualisiert`,
        };
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

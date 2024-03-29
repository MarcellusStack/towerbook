"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const completeFirstAidOperation = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { session }) => {
    try {
      const operation = await prisma.firstAidOperation.findUnique({
        where: {
          id: id,
          organizationId: session.organizationId as string,
          status: { not: "completed" },
        },
        select: {
          status: true,
          id: true,
          helper: true,
          type: true,
        },
      });

      if (!operation) {
        throw new Error("Einsatz konnte nicht gefunden werden");
      }

      if (
        (operation.type === "small" && operation.helper === null) ||
        operation.helper.length === 0
      ) {
        throw new Error("Es muss ein Helfer zugewiesen werden");
      }

      await prisma.firstAidOperation.update({
        where: {
          id: id,
          organizationId: session.organizationId as string,
          status: { not: "completed" },
        },
        data: {
          status: "completed",
        },
        select: {
          id: true,
        },
      });

      await prisma.revision.deleteMany({
        where: {
          modelId: operation.id,
        },
      });

      revalidatePath("/", "layout");

      return {
        message: `Der Einsatz wurde abgeschlossen`,
      };
    } catch (error) {
      throw new Error("Fehler beim abschließen des Einsatzes");
    }
  }
);

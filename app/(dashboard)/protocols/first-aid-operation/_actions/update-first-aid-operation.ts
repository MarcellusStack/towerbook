"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { updateFirstAidOperationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { type FirstAidOperationType } from "@prisma/client";

const handleRelationUpdate = (currentId: string, newId: string) => {
  if (newId !== currentId) {
    return {
      connect: { id: newId },
    };
  }
  return undefined;
};

export const updateFirstAidOperation = authAction("updateProtocol")(
  updateFirstAidOperationSchema,
  async ({ id, type, date, startTime, guardLeader, towerId }, { session }) => {
    try {
      const currentOperation = await prisma.firstAidOperation.findUnique({
        where: { id: id },
        include: { guardLeader: true, tower: true },
      });

      if (!currentOperation) {
        throw new Error("Einsatz nicht gefunden");
      }

      await prisma.firstAidOperation.update({
        where: { id: id, organizationId: session.organizationId as string },
        data: {
          type: type as FirstAidOperationType,
          date: new Date(date as Date),
          startTime: extractTimeFromDate(startTime),
          guardLeader: handleRelationUpdate(
            currentOperation.guardLeader.id,
            guardLeader.id
          ),
          tower: handleRelationUpdate(currentOperation.tower.id, towerId),
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Einsatzes");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde aktualisiert` };
  }
);

"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { updateTowerFirstAidOperationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { type FirstAidOperationType } from "@prisma/client";

export const updateTowerFirstAidOperation = authAction("updateProtocol")(
  updateTowerFirstAidOperationSchema,
  async ({ id, type, date, startTime, guardLeader }, { session }) => {
    try {
      await prisma.firstAidOperation.update({
        where: { id: id, organizationId: session.organizationId as string },
        data: {
          type: type as FirstAidOperationType,
          date: new Date(date as Date),
          startTime: extractTimeFromDate(startTime),
          guardLeader: { connect: { id: guardLeader.id } },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Einsatzes");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde aktualisiert` };
  }
);

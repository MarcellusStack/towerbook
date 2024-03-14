"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { updateFirstAidOperationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { type FirstAidOperationType } from "@prisma/client";

export const updateFirstAidOperation = authAction("updateProtocol")(
  updateFirstAidOperationSchema,
  async ({ id, type, date, startTime, guardLeader, towerId }, { session }) => {
    try {
     

      await prisma.firstAidOperation.update({
        where: { id: id, organizationId: session.organizationId as string },
        data: {
          type: type as FirstAidOperationType,
          date: new Date(date as Date),
          startTime: extractTimeFromDate(startTime),
          guardLeader: { connect: { id: guardLeader.id } },
          tower: { connect: { id: towerId } },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Einsatzes");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde aktualisiert` };
  }
);

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createFirstAidOperationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { type FirstAidOperationType } from "@prisma/client";

export const createFirstAidOperation = adminAction(
  createFirstAidOperationSchema,
  async ({ type, date, startTime, guardLeader, towerId }, { session }) => {
    try {
      await prisma.firstAidOperation.create({
        data: {
          type: type as FirstAidOperationType,
          date: new Date(date as Date),
          startTime: extractTimeFromDate(startTime),
          guardLeader: { connect: { id: guardLeader.id } },
          tower: { connect: { id: towerId } },
          organization: { connect: { id: session.organizationId as string } },
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Erste Hilfe Einsatzes");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde erstellt` };
  }
);

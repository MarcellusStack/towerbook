"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createFirstAidOperationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";
import { type FirstAidOperationType } from "@prisma/client";

export const createFirstAidOperation = adminAction(
  createFirstAidOperationSchema,
  async ({ type, date, startTime, guardLeader, towerId }, { user }) => {
    try {
      const operation = await prisma.firstAidOperation.create({
        data: {
          type: type as FirstAidOperationType,
          date: new Date(date as Date),
          startTime: extractTimeFromDate(startTime),
          guardLeader: { connect: { userId: guardLeader.userId } },
          tower: { connect: { id: towerId } },
          organization: { connect: { id: user.organizationId as string } },
        },
        select: {
          id: true,
        },
      });

      if (!operation.id) {
        throw new Error("Couldnt create first aid operation");
      }
    } catch (error) {
      throw new Error("Fehler beim Erstellen der Gruppe");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde erstellt.` };
  }
);

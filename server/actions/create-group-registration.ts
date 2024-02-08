"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { createGroupRegistrationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const createGroupRegistration = authAction("createProtocol")(
  createGroupRegistrationSchema,
  async (
    {
      date,
      time,
      name,
      count,
      supervisorFirstName,
      supervisorLastName,
      towerId,
    },
    { session }
  ) => {
    try {
      await prisma.groupRegistration.create({
        data: {
          date: new Date(date as Date),
          time: extractTimeFromDate(time),
          name: name,
          count: parseInt(count),
          supervisorFirstName: supervisorFirstName,
          supervisorLastName: supervisorLastName,
          tower: { connect: { id: towerId } },
          organization: { connect: { id: session.organizationId as string } },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen der Gruppe");
    }

    revalidatePath("/", "layout");

    return { message: `Die Gruppe wurde erstellt` };
  }
);

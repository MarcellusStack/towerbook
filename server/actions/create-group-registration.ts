"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { createGroupRegistrationSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const createGroupRegistration = adminAction(
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
    { user }
  ) => {
    try {
      const group = await prisma.groupRegistration.create({
        data: {
          date: new Date(date as Date),
          time: extractTimeFromDate(time),
          name: name,
          count: parseInt(count),
          supervisorFirstName: supervisorFirstName,
          supervisorLastName: supervisorLastName,
          tower: { connect: { id: towerId } },
          organization: { connect: { id: user.organizationId as string } },
        },
        select: {
          id: true,
        },
      });

      if (!group.id) {
        throw new Error("Couldnt create groupregistration");
      }
    } catch (error) {
      throw new Error("Fehler beim Erstellen der Gruppe");
    }

    revalidatePath("/", "layout");

    return { message: `Die Gruppe wurde erstellt.` };
  }
);

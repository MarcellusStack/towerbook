"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteGroupRegistration = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      await prisma.groupRegistration.delete({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen der Gruppenanmeldung");
    }

    revalidatePath("/", "layout");

    return { message: `Die Gruppenanmeldung wurde gelöscht` };
  }
);

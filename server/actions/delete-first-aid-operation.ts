"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { towerBelongsToOrganization } from "@server/lib/utils/tower-belong-to-organization";

export const deleteFirstAidOperation = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    try {
      const operation = await prisma.firstAidOperation.delete({
        where: {
          id: id,
          organizationId: user.organizationId as string,
        },
        select: {
          id: true,
        },
      });

      if (!operation.id) {
        throw new Error("Couldnt delete operation");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen des Einsatzes");
    }

    revalidatePath("/", "layout");

    return { message: `Der Einsatz wurde gelöscht.` };
  }
);

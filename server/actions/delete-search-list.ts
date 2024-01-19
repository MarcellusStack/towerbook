"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { towerBelongsToOrganization } from "@server/lib/utils/tower-belong-to-organization";

export const deleteSearchList = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      await prisma.searchList.delete({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen des Sucheintrag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Sucheintrag wurde gelöscht` };
  }
);

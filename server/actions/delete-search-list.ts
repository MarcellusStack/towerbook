"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { towerBelongsToOrganization } from "@server/lib/utils/tower-belong-to-organization";

export const deleteSearchList = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    const searchlist = await prisma.searchList.findUnique({
      where: { id },
      select: {
        id: true,
        towerId: true,
      },
    });

    if (!searchlist) {
      throw new Error("Der Sucheintrag existiert nicht");
    }

    await towerBelongsToOrganization(searchlist.towerId, user?.organizationId);

    try {
      const searchlist = await prisma.searchList.delete({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });

      if (!searchlist.id) {
        throw new Error("Couldnt delete searchlist");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen des Sucheintrag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Sucheintrag wurde gelöscht.` };
  }
);

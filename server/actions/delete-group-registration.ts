"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { deleteUserSchema, deleteSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { towerBelongsToOrganization } from "@server/lib/utils/tower-belong-to-organization";

export const deleteGroupRegistration = adminAction(
  deleteSchema,
  async ({ id }, { user }) => {
    try {
      const groupregistration = await prisma.groupRegistration.delete({
        where: {
          id: id,
          organizationId: user.organizationId as string,
        },
        select: {
          id: true,
        },
      });

      if (!groupregistration.id) {
        throw new Error("Couldnt delete Group Registration");
      }
    } catch (error) {
      throw new Error("Fehler beim löschen der Gruppenanmeldung");
    }

    revalidatePath("/", "layout");

    return { message: `Die Gruppenanmeldung wurde gelöscht.` };
  }
);

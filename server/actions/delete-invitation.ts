"use server";
import { prisma } from "@server/db";

import { adminAction } from "@server/lib/utils/action-clients";
import {
  createUserSchema,
  deleteSchema,
  inviteUserSchema,
} from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { type Role } from "@prisma/client";
import { z } from "zod";

export const deleteInvitation = adminAction(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      await prisma.invitation.delete({
        where: {
          organizationId: session.organizationId as string,
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen der Einladung");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Einladung wurde gelöscht`,
    };
  }
);

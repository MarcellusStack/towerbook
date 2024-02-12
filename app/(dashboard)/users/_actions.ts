"use server";
import { deleteSchema } from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const deleteUser = authAction("deleteUser")(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      if (session.id === id) {
        throw new Error("Du kannst dich selber nicht löschen");
      }

      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { id: id, organizationId: session.organizationId },
            select: {
              id: true,
              organizationId: true,
            },
          });

          if (!user) {
            throw new Error("Benutzer nicht gefunden");
          }

          await tx.user.delete({
            where: {
              id: user.id,
            },
          });

          await clerkClient.users.deleteUser(session.id);
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim löschen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: "Benutzer wurde gelöscht" };
  }
);

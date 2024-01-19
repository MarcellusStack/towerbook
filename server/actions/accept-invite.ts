"use server";
import { toLowercaseAndTrim } from "@/utils";
import { Role } from "@prisma/client";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const acceptInvite = authAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
  }),
  async ({ id }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const invitation = await tx.invitation.findUnique({
            where: { id: id },
            select: {
              id: true,
              organizationId: true,
              role: true,
            },
          });

          if (!invitation) {
            throw new Error("Einladung nicht gefunden");
          }

          const user = await tx.user.update({
            where: {
              id: session.id,
            },
            data: {
              organization: {
                connect: {
                  id: invitation.organizationId,
                },
              },
              role: new Array(invitation.role) as Role[],
            },
            select: {
              email: true,
            },
          });

          if (!user) {
            throw new Error("User nicht gefunden");
          }

          await tx.invitation.deleteMany({
            where: {
              email: toLowercaseAndTrim(user.email),
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim akzeptieren der Einladung");
    }

    revalidatePath("/", "layout");

    return { message: `Einladung angenommen Sie können jetzt beginnen` };
  }
);

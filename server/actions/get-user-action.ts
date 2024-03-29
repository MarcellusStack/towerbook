"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getUserAction = authAction()(
  z.object({ search: z.string().optional() }),
  async ({ search }, { session }) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          organizationId: session.organizationId,
          ...(search && {
            OR: [
              { firstName: { contains: search } },
              { lastName: { contains: search } },
            ],
          }),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
        take: 25,
      });

      return { users: users, message: "Benutzer erfolgreich geladen" };
    } catch (error) {
      throw new Error("Fehler beim laden der Benutzer");
    }
  }
);

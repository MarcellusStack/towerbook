"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getGuardLeaderAction = authAction()(
  z.object({ search: z.string().optional() }),
  async ({ search }, { session }) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          organizationId: session.organizationId,
          guardLeader: {
            not: null, // Only get users who have a guard leader
          },
          guardLeaderExpiration: {
            gte: new Date(), // Only get users whose guard leader expiration date is not in the past
          },
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

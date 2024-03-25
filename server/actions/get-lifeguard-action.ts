"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getLifeguardAction = authAction()(
  z.object({ search: z.string().optional() }),
  async ({ search }, { session }) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          organizationId: session.organizationId,
          OR: [
            {
              AND: [
                {
                  lifeguardLicense: {
                    not: null, // Only get users who have a lifeguard license
                  },
                  lifeguardLicenseExpiration: {
                    gte: new Date(), // Only get users whose lifeguard license expiration date is not in the past
                  },
                },
              ],
            },
            {
              AND: [
                {
                  paramedic: {
                    not: null, // Only get users who are paramedics
                  },
                  paramedicExpiration: {
                    gte: new Date(), // Only get users whose paramedic expiration date is not in the past
                  },
                },
              ],
            },
          ],
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

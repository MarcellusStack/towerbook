"use server";

import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

export const getUserDashboard = cache(
  authQuery(async (session) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    return await prisma.user.findFirst({
      where: {
        organizationId: session.organizationId,
        id: session.id,
      },
      select: {
        gender: true,
        firstName: true,
        lastName: true,
        salutation: true,
        birthDate: true,
        street: true,
        houseNumber: true,
        zipCode: true,
        location: true,
        phone: true,
        lifeguardLicense: true,
        organization: {
          select: {
            towerLocations: true,
            towers: {
              select: {
                id: true,
                main: true,
                name: true,
                status: true,
                location: true,
                number: true,
                towerdays: {
                  where: {
                    createdAt: {
                      gte: todayStart,
                      lte: todayEnd,
                    },
                  },
                  select: {
                    id: true,
                    material: true,
                  },
                },
              },
            },
            permissions: {
              take: 2,
            },
            members: {
              take: 2,
            },
          },
        },
      },
    });
  })
);

export type UserDashboardProps = NonNullable<
  Awaited<ReturnType<typeof getUserDashboard>>
>;

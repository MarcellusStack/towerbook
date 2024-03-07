"use server";

import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

export const getSettingsDashboard = cache(
  authQuery(async (session) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await prisma.user.findFirst({
      where: {
        organizationId: session.organizationId,
        id: session.id,
      },
      select: {
        firstName: true,
        lastName: true,
        bookings: {
          where: {
            date: {
              gte: today,
            },
          },
          select: {
            id: true,
            date: true,
            status: true,
            accomodation: {
              select: {
                street: true,
                zipCode: true,
                location: true,
              },
            },
          },
        },
      },
    });
  })
);

export type SettingsDashboardProps = NonNullable<
  Awaited<ReturnType<typeof getSettingsDashboard>>
>;

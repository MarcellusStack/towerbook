"use server";

import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { cache } from "react";

export const getUserDashboard = cache(
  authQuery(async (session) => {
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
              take: 1,
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

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
        firstName: true,
        lastName: true,
      },
    });
  })
);

export type UserDashboardProps = NonNullable<
  Awaited<ReturnType<typeof getUserDashboard>>
>;

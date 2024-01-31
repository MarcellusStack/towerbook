"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type Tower, Role } from "@prisma/client";
import { cache } from "react";

export type TowerProps = Pick<Tower, "name" | "location" | "number">;

export const getTower = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.tower.findFirst({
      where: {
        organizationId: session.organizationId,
        id: search,
      },
      select: {
        name: true,
        location: true,
        number: true,
      },
    });
  })
);

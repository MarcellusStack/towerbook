"use server";
import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";
import { type Tower } from "@prisma/client";

export const getTowers = authFilterQuery(async (search, user) => {
  if (user.role.includes("admin")) {
    return await prisma.tower.findMany({
      where: {
        organizationId: user.organizationId,
        number: search ?? undefined,
      },
    });
  }

  return await prisma.tower.findMany({
    where: {
      organizationId: user.organizationId,
      number: search ?? undefined,
      members: {
        some: {
          id: user.profileId,
        },
      },
    },
  });
});

export type TowersProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>;

export type TowerProps = NonNullable<Awaited<ReturnType<typeof getTowers>>>[0];

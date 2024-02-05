"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getPermissionAction = authAction()(
  z.object({ search: z.string().optional() }),
  async ({ search }, { session }) => {
    try {
      const permissions = await prisma.permission.findMany({
        where: {
          organizationId: session.organizationId,
          ...(search && {
            name: { contains: search },
          }),
        },
        select: {
          id: true,
          name: true,
        },
        take: 25,
      });

      return {
        permissions: permissions,
        message: "Berechtigungen erfolgreich geladen",
      };
    } catch (error) {
      throw new Error("Fehler beim laden der Berechtigungen");
    }
  }
);

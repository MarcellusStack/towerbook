"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getUserAction = adminAction(
  z.object({}),
  async ({}, { session }) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          organizationId: session.organizationId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      });

      return { users: users, message: "Benutzer erfolgreich geladen" };
    } catch (error) {
      throw new Error("Fehler beim laden der Benutzer");
    }
  }
);

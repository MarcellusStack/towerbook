"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getTowerAction = adminAction(
  z.object({}),
  async ({}, { user }) => {
    try {
      const towers = await prisma.tower.findMany({
        where: {
          organizationId: user.organizationId,
        },
        select: {
          id: true,
          name: true,
          number: true,
        },
      });

      return { towers: towers, message: "Türme erfolgreich geladen" };
    } catch (error) {
      throw new Error("Fehler beim laden der Türme");
    }
  }
);

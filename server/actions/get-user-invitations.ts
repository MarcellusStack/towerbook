"use server";
import { toLowercaseAndTrim } from "@/utils";
import { prisma } from "@server/db";
import { adminAction, authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getUserInvitations = authAction(
  z.object({}),
  async ({}, { session }) => {
    try {
      const invitations = await prisma.invitation.findMany({
        where: {
          email: toLowercaseAndTrim(session.email),
        },
        select: {
          id: true,
          email: true,
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        invitations: invitations,
        message: "Einladungen erfolgreich geladen",
      };
    } catch (error) {
      throw new Error("Fehler beim laden der Einladungen");
    }
  }
);

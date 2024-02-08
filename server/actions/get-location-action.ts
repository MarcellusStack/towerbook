"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import * as z from "zod";

export const getLocationAction = authAction()(
  z.object({ search: z.string().optional() }),
  async ({ search }, { session }) => {
    try {
      const organization = await prisma.organization.findFirst({
        where: {
          id: session.organizationId,
        },
        select: {
          towerLocations: true,
        },
      });

      let locations = organization?.towerLocations || [];

      // If search string is provided, filter the locations
      if (search) {
        locations = locations.filter((location) =>
          location.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Limit the number of returned locations to 25
      locations = locations.slice(0, 25);

      return {
        locations: locations,
        message: "Standorte geladen",
      };
    } catch (error) {
      throw new Error("Fehler beim laden der Standorte");
    }
  }
);

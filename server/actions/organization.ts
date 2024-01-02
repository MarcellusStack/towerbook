"use server";
import {
  beachSectionsSchema,
  towerDayAdministrationSchema,
  weatherSchema,
} from "@/schemas";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const updateName = adminAction(
  z.object({ name: z.string() }),
  async ({ name }, { user }) => {
    try {
      await prisma.organization.update({
        where: {
          id: user.organizationId as string,
        },
        data: {
          name: name,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Organisation");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Organisation wurde aktualisiert`,
    };
  }
);

export const updateLocations = adminAction(
  z.object({ towerLocations: z.array(z.string()) }),
  async ({ towerLocations }, { user }) => {
    try {
      await prisma.organization.update({
        where: {
          id: user.organizationId as string,
        },
        data: {
          towerLocations: towerLocations,
          beachSections:
            towerLocations.length > 0
              ? towerLocations.map((location) => ({
                  id: uuidv4(),
                  location: location,
                  sections: [],
                }))
              : [],
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Organisation");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Organisation wurde aktualisiert`,
    };
  }
);

export const updateBeachSections = adminAction(
  beachSectionsSchema,
  async ({ beachSections }, { user }) => {
    try {
      await prisma.organization.update({
        where: {
          id: user.organizationId as string,
        },
        data: {
          beachSections: beachSections,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Organisation");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Organisation wurde aktualisiert`,
    };
  }
);

export const updateTowerDayAdministration = adminAction(
  towerDayAdministrationSchema,
  async ({ todo, weather, material }, { user }) => {
    try {
      await prisma.organization.update({
        where: {
          id: user.organizationId as string,
        },
        data: {
          todo: todo,
          weather: weather,
          material:material,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Organisation");
    }

    revalidatePath("/", "layout");

    return {
      message: `Die Organisation wurde aktualisiert`,
    };
  }
);

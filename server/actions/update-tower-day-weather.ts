"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayWeatherSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateTowerDayWeather = adminAction(
  towerDayWeatherSchema,
  async ({ id, weather }, { user }) => {
    try {
      // check if form is already on status completed based on that
      // dont allow to update the form?
      const towerday = await prisma.towerDay.update({
        where: {
          id: id,
          status: { equals: "ongoing" },
          weatherStatus: {
            not: "completed",
          },
        },
        data: {
          weatherStatus: "ongoing",
          weather: weather,
        },
        select: { id: true },
      });

      if (!towerday.id) {
        throw new Error("Couldnt update tower day");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag wurde aktualisiert.`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag");
    }
  }
);

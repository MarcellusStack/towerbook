"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerDayWeatherSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateTowerDayWeather = authAction("updateTowerday")(
  towerDayWeatherSchema,
  async ({ id, weather }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          weatherStatus: {
            not: "completed",
          },
        },
        data: {
          weatherStatus: "ongoing",
          weather: weather,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Turm Tag wurde aktualisiert`,
    };
  }
);

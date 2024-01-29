"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayWeatherSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateTowerDayWeather = adminAction(
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

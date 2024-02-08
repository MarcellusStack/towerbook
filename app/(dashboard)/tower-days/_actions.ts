"use server";
import { prisma } from "@server/db";
import { adminAction, authAction } from "@server/lib/utils/action-clients";
import { createTowerDaysSchema } from "@/schemas";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export const getTowersAction = authAction("readTower")(
  z.object({}),
  async ({}, { session }) => {
    try {
      const towers = await prisma.tower.findMany({
        where: {
          organizationId: session.organizationId,
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

export const createTowerDays = authAction("createTowerday")(
  createTowerDaysSchema,
  async (
    { createdAt, guardLeader, towerdays, addTodo, addMaterial, addWeather },
    { session }
  ) => {
    try {
      const towerdayAdministration = await prisma.organization.findFirst({
        where: { id: session.organizationId },
        select: {
          weather: true,
          material: true,
          todo: true,
        },
      });

      if (!towerdayAdministration) {
        throw new Error("Fehler beim laden der Organisation");
      }

      const material = towerdayAdministration.material.map((item) => ({
        ...item,
        checked: "unchecked",
        comment: "",
      }));

      const weather = towerdayAdministration.weather.map((item) => ({
        ...item,
        air_in_celsius: "",
        water_in_celsius: "",
        wind_in_bft: "",
        wind_direction: "",
      }));

      const weekdaysNumber = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      const todos = towerdayAdministration?.todo
        .filter((todo) => {
          const today = new Date();

          switch (todo.type) {
            case "daily":
              return true;
            case "weekly":
              return weekdaysNumber[todo.day] === today.getDay();
            case "monthly":
              return new Date(todo.date).getDate() === today.getDate();
            default:
              return false;
          }
        })
        .map((todo) => ({
          ...todo,
          checked: false,
        }));
      const towerDayData = towerdays.map((towerday) => {
        const date = new Date(createdAt as Date);
        date.setHours(0, 0, 0, 0);

        return {
          createdAt: date,
          guardLeaderId: guardLeader.id,
          towerId: towerday.tower.id,
          towerLeaderId: towerday.towerLeader.id,
          organizationId: session.organizationId as string,
          material: addMaterial ? material : [],
          weather: addWeather ? weather : [],
          todo: addTodo ? todos : [],
        };
      });

      await prisma.towerDay.createMany({
        data: towerDayData,
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde erstellt` };
  }
);

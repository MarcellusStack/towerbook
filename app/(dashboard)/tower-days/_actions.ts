"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
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
          location: true,
        },
      });

      return { towers: towers, message: "Türme erfolgreich geladen" };
    } catch (error) {
      throw new Error("Fehler beim laden der Türme");
    }
  }
);

export const getTowerdayAdministration = async (organizationId: string) => {
  const towerdayAdministration = await prisma.organization.findFirst({
    where: { id: organizationId },
    select: {
      weather: true,
      material: true,
      todo: true,
    },
  });

  if (!towerdayAdministration) {
    throw new Error("Fehler beim laden der Organisation");
  }

  const weekdaysNumber = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const material =
    towerdayAdministration.material &&
    towerdayAdministration?.material
      .filter((material) => {
        const today = new Date();

        switch (material.type) {
          case "daily":
            return true;
          case "weekly":
            return weekdaysNumber[material.day] === today.getDay();
          case "monthly":
            return new Date(material.date).getDate() === today.getDate();
          default:
            return false;
        }
      })
      .map((material) => ({
        ...material,
        checked: "unchecked",
        comment: "",
      }));

  const weather =
    towerdayAdministration.weather &&
    towerdayAdministration.weather.map((item) => ({
      ...item,
      air_in_celsius: "",
      water_in_celsius: "",
      wind_in_bft: "",
      wind_direction: "",
    }));

  const todos =
    towerdayAdministration.todo &&
    towerdayAdministration?.todo
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
        comment: "",
      }));

  return {
    material,
    weather,
    todos,
  };
};

export const createTowerDays = authAction("createTowerday")(
  createTowerDaysSchema,
  async (
    { createdAt, guardLeader, towerdays, addTodo, addMaterial, addWeather },
    { session }
  ) => {
    try {
      const towerdayAdministration = await getTowerdayAdministration(
        session.organizationId
      );

      const towerDayData = towerdays.map((towerday) => {
        const date = new Date(createdAt as Date);
        date.setHours(0, 0, 0, 0);

        return {
          createdAt: date,
          guardLeaderId: guardLeader.id,
          towerId: towerday.tower.id,
          towerLeaderId: towerday.towerLeader.id,
          organizationId: session.organizationId as string,
          material: addMaterial ? towerdayAdministration.material : [],
          weather: addWeather ? towerdayAdministration.weather : [],
          todo: addTodo ? towerdayAdministration.todos : [],
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

export const completeTowerDays = authAction("completeTowerday")(
  z.object({
    ids: z.array(z.string().min(1, { message: "Id wird benötigt" })),
  }),
  async ({ ids }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const towerdays = await tx.towerDay.findMany({
            where: { id: { in: ids } },
            select: {
              id: true,
              towerId: true,
              watchmanStatus: true,
              todoStatus: true,
              incidentStatus: true,
              weatherStatus: true,
              materialStatus: true,
              dutyplanStatus: true,
            },
          });

          if (towerdays.length === 0) {
            throw new Error("Couldnt find any tower days");
          }

          await tx.revision.deleteMany({
            where: {
              modelId: { in: ids },
            },
          });

          const updatePromises = towerdays.map((towerday) =>
            tx.towerDay.update({
              where: { id: towerday.id },
              data: {
                watchmanStatus:
                  towerday.watchmanStatus !== "completed"
                    ? "incomplete"
                    : "completed",
                todoStatus:
                  towerday.todoStatus !== "completed"
                    ? "incomplete"
                    : "completed",
                incidentStatus:
                  towerday.incidentStatus !== "completed"
                    ? "incomplete"
                    : "completed",
                dutyplanStatus:
                  towerday.dutyplanStatus !== "completed"
                    ? "incomplete"
                    : "completed",
                weatherStatus:
                  towerday.weatherStatus !== "completed"
                    ? "incomplete"
                    : "completed",
                materialStatus:
                  towerday.materialStatus !== "completed"
                    ? "incomplete"
                    : "completed",
              },
            })
          );

          await Promise.all(updatePromises);

          // Uncomment this if you want to update the tower status when all tower days are completed
          /* if (updatedTowerdays && updatedTowerdays.every(towerday => towerday.status === "completed")) {
            await tx.tower.updateMany({
              where: { id: { in: towerdays.map(towerday => towerday.towerId) } },
              data: {
                status: "beach_closed",
              },
            });
          } */
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );

      revalidatePath("/", "layout");

      return {
        message: `Der Turm Tag Status wurde aktualisiert`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Turm Tag Status");
    }
  }
);

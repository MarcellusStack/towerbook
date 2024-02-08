"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { createTowerDaySchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { getTowerdayAdministration } from "@towerdays/_actions";

export const createTowerDay = authAction("createTowerday")(
  createTowerDaySchema,
  async (
    {
      createdAt,
      guardLeader,
      towerLeader,
      towerId,
      addTodo,
      addMaterial,
      addWeather,
    },
    { session }
  ) => {
    try {
      const towerdayAdministration = await getTowerdayAdministration(
        session.organizationId
      );
      const date = new Date(createdAt as Date);
      date.setHours(0, 0, 0, 0);
      await prisma.towerDay.create({
        data: {
          createdAt: date,
          tower: { connect: { id: towerId } },
          guardLeader: { connect: { id: guardLeader.id } },
          towerLeader: { connect: { id: towerLeader.id } },
          organization: { connect: { id: session.organizationId as string } },
          material: addMaterial ? towerdayAdministration.material : [],
          weather: addWeather ? towerdayAdministration.weather : [],
          todo: addTodo ? towerdayAdministration.todos : [],
        },
      });
    } catch (error) {
      throw new Error("Fehler beim Erstellen des Turm Tag");
    }

    revalidatePath("/", "layout");

    return { message: `Der Turm Tag wurde erstellt` };
  }
);

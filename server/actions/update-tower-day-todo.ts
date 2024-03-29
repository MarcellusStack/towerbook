"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { towerDayTodoSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateTowerDayTodo = authAction("updateTowerday")(
  towerDayTodoSchema,
  async ({ id, todo }) => {
    try {
      await prisma.towerDay.update({
        where: {
          id: id,
          status: { notIn: ["revision", "completed"] },
          todoStatus: {
            not: "completed",
          },
        },
        data: {
          todoStatus: "ongoing",
          todo: todo,
        },
        select: { id: true },
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

"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { towerDayTodoSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateTowerDayTodo = adminAction(
  towerDayTodoSchema,
  async ({ id, todo }, { user }) => {
    try {
      // check if form is already on status completed based on that
      // dont allow to update the form?
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
      message: `Der Turm Tag wurde aktualisiert.`,
    };
  }
);

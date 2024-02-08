"use server";

import {
  towerdayAdministrationMaterialSchema,
  towerdayAdministrationTodoSchema,
  towerdayAdministrationWeatherSchema,
} from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";

export const updateTowerdayAdministrationTodo = authAction(
  "updateOrganization"
)(towerdayAdministrationTodoSchema, async ({ todo }, { session }) => {
  try {
    await prisma.organization.update({
      where: {
        id: session.organizationId as string,
      },
      data: {
        todo: todo,
      },
    });
  } catch (error) {
    throw new Error("Fehler beim aktualisieren der Organisation");
  }

  revalidatePath("/", "layout");

  return {
    message: `Die Todo´s wurden aktualisiert`,
  };
});

export const updateTowerdayAdministrationMaterial = authAction(
  "updateOrganization"
)(towerdayAdministrationMaterialSchema, async ({ material }, { session }) => {
  try {
    await prisma.organization.update({
      where: {
        id: session.organizationId as string,
      },
      data: {
        material: material,
      },
    });
  } catch (error) {
    throw new Error("Fehler beim aktualisieren der Organisation");
  }

  revalidatePath("/", "layout");

  return {
    message: `Das Material wurde aktualisiert`,
  };
});

export const updateTowerdayAdministrationWeather = authAction(
  "updateOrganization"
)(towerdayAdministrationWeatherSchema, async ({ weather }, { session }) => {
  try {
    await prisma.organization.update({
      where: {
        id: session.organizationId as string,
      },
      data: {
        weather: weather,
      },
    });
  } catch (error) {
    throw new Error("Fehler beim aktualisieren der Organisation");
  }

  revalidatePath("/", "layout");

  return {
    message: `Das Wetter wurde aktualisiert`,
  };
});

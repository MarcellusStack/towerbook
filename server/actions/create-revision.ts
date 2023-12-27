"use server";
import { convertTime, extractTimeFromDate } from "@/utils";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { type RevisionType } from "@prisma/client";
import { revisionModels } from "@constants/index";

export const createRevision = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    modelType: z.string().min(1, { message: "Model wird benötigt" }),
  }),
  async ({ id, modelType }, { user }) => {
    const filteredModel = revisionModels.filter(
      (model) => model.type === modelType
    )[0];
    try {
      const selectedModel = await prisma[filteredModel.model].findFirst({
        where: {
          id: id,
          organizationId: user.organizationId as string,
          status: "ongoing",
        },
        select: {
          status: true,
          id: true,
          towerId: true,
        },
      });

      if (!selectedModel) {
        throw new Error("Model wurde nicht gefunden");
      }

      const revision = await prisma.revision.create({
        data: {
          modelId: selectedModel.id,
          date: new Date(),
          time: extractTimeFromDate(convertTime(new Date())),
          url: `${filteredModel.url}${selectedModel.id}`,
          type: filteredModel.type as RevisionType,
          tower: { connect: { id: selectedModel.towerId } },
          organization: { connect: { id: user.organizationId as string } },
        },
        select: {
          id: true,
        },
      });

      if (!revision) {
        throw new Error("Revision konnte nicht erstellt werden");
      }

      const updateSelectedModel = await prisma[filteredModel.model].update({
        where: { id: id },
        data: { status: "revision" },
      });

      if (!updateSelectedModel) {
        throw new Error("Model konnte nicht aktualisiert werden");
      }

      revalidatePath("/", "layout");

      return {
        message: `Revision wurde erstellt`,
      };
    } catch (error) {
      throw new Error("Fehler beim erstellen der Revision");
    }
  }
);

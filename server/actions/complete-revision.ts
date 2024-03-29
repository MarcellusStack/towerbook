"use server";
import { convertTime, extractTimeFromDate } from "@/utils";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { type RevisionType } from "@prisma/client";
import { revisionModels } from "@constants/index";

export const completeRevision = adminAction(
  z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    modelType: z.string().min(1, { message: "Model wird benötigt" }),
  }),
  async ({ id, modelType }, { session }) => {
    const filteredModel = revisionModels.filter(
      (model) => model.type === modelType
    )[0];
    try {
      const selectedModel = await prisma[filteredModel.model].findUnique({
        where: {
          id: id,
          organizationId: session.organizationId as string,
          status: "revision",
        },
        select: {
          status: true,
          id: true,
          towerId: true,
        },
      });

      const revision = await prisma.revision.delete({
        where: {
          modelId: id,
        },
        select: {
          id: true,
        },
      });

      const updateSelectedModel = await prisma[filteredModel.model].update({
        where: { id: id },
        data: { status: "ongoing" },
      });

      revalidatePath("/", "layout");

      return {
        message: `Revision wurde abgeschlossen`,
      };
    } catch (error) {
      throw new Error("Fehler beim abschließen der Revision");
    }
  }
);

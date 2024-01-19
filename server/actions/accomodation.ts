"use server";
import { authAction } from "@server/lib/utils/action-clients";
import { prisma } from "@server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const enableAccomodation = authAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.accomodation.update({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
        data: { reservable: true },
      });
    } catch (error) {
      throw new Error("Fehler beim freigeben der Unterkunft");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Unterkuft freigegeben`,
    };
  }
);

export const disableAccomodation = authAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.accomodation.update({
        where: { id: id, organizationId: session.organizationId as string },
        data: { reservable: false },
      });
    } catch (error) {
      throw new Error("Fehler beim sperren der Unterkunft");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Unterkuft gesperrt`,
    };
  }
);

export const deleteAccomodation = authAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }, { session }) => {
    try {
      await prisma.accomodation.delete({
        where: { id: id, organizationId: session.organizationId as string },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen der Unterkunft");
    }

    revalidatePath("/", "layout");

    return {
      message: `Sie haben die Unterkunft gelöscht`,
    };
  }
);

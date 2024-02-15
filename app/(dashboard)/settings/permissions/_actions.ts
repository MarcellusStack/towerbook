"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { createPermissionSchema, deleteSchema } from "@schemas/index";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { cache } from "react";

export const getPermissions = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.permission.findMany({
      where: {
        organizationId: session.organizationId,
        name: search ?? undefined,
      },
      select: {
        id: true,
        name: true,
        description: true,
        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }, "readPermission")
);

export type PermissionsProps = NonNullable<
  Awaited<ReturnType<typeof getPermissions>>
>;

export const createPermission = authAction("createPermission")(
  createPermissionSchema,
  async ({ name, description }, { session }) => {
    try {
      await prisma.permission.create({
        data: {
          name: name,
          description: description,
          organization: {
            connect: {
              id: session.organizationId as string,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim erstellen der Berechtigung");
    }

    revalidatePath("/", "layout");

    return { message: `Die Berechtigung wurde erstellt` };
  }
);

export const deletePermission = authAction("deletePermission")(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      await prisma.permission.delete({
        where: {
          organizationId: session.organizationId,
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim löschen der Berechtigung");
    }

    revalidatePath("/", "layout");

    return { message: `Die Berechtigung wurde gelöscht` };
  }
);

"use server";
import { userPermissionsSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { authAction } from "@/server/lib/utils/action-clients";

export const getUserPermission = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      firstName: true,
      lastName: true,
      towers: {
        select: {
          id: true,
          name: true,
          location: true,
        },
      },
      permissions: {
        select: { name: true, id: true },
      },
      id: true,
    },
  });
}, "readUser");

export type UserPermissionProps = NonNullable<
  Awaited<ReturnType<typeof getUserPermission>>
>;

export const updateUserPermissions = authAction("updateUser")(
  userPermissionsSchema,
  async ({ id, permissions }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { id: id, organizationId: session.organizationId },
            select: {
              permissions: {
                select: {
                  id: true,
                },
              },
            },
          });

          if (!user) {
            throw new Error("User konnte nicht gefunden werden");
          }

          const currentPermissionIds = user.permissions.map(
            (permission) => permission.id
          );

          const permissionToDisconnect = currentPermissionIds.filter(
            (permission) => !permissions.some((p) => p.id === permission)
          );

          const permissionsToConnect = permissions.filter(
            (permission) => !currentPermissionIds.includes(permission.id)
          );

          await tx.user.update({
            where: {
              organizationId: session.organizationId,
              id: id,
            },
            data: {
              permissions: {
                disconnect: permissionToDisconnect.map((permission) => ({
                  id: permission,
                })),
                connect: permissionsToConnect.map((permission) => ({
                  id: permission.id,
                })),
              },
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde aktualisiert`,
    };
  }
);

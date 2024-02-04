"use server";
import { updatePermissionSchema } from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { authFilterQuery } from "@/server/lib/utils/query-clients";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getPermission = cache(
  authFilterQuery(async (search, session) => {
    return await prisma.permission.findFirst({
      where: {
        organizationId: session.organizationId,
        id: search ?? undefined,
      },
      include: {
        users: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }, "readPermission")
);

export type PermissionProps = NonNullable<
  Awaited<ReturnType<typeof getPermission>>
>;

export const updatePermission = authAction("updatePermission")(
  updatePermissionSchema,
  async (
    {
      id,
      name,
      description,
      isAdmin,
      createOrganization,
      readOrganization,
      updateOrganization,
      deleteOrganization,
      createInvitation,
      readInvitation,
      updateInvitation,
      deleteInvitation,
      createTower,
      readTower,
      updateTower,
      deleteTower,
      createTowerday,
      readTowerday,
      updateTowerday,
      deleteTowerday,
      completeTowerday,
      createDutyplan,
      readDutyplan,
      updateDutyplan,
      deleteDutyplan,
      createUser,
      readUser,
      updateUser,
      deleteUser,
      createProtocol,
      readProtocol,
      updateProtocol,
      deleteProtocol,
      completeProtocol,
      createRevision,
      readRevision,
      updateRevision,
      deleteRevision,
      createAccomodation,
      readAccomodation,
      updateAccomodation,
      deleteAccomodation,
      createBooking,
      readBooking,
      updateBooking,
      deleteBooking,
      createPermission,
      readPermission,
      updatePermission,
      deletePermission,
      users,
    },
    { session }
  ) => {
    try {
      const permission = await prisma.permission.findUnique({
        where: { id: id, organizationId: session.organizationId },
        select: {
          users: { select: { id: true } },
        },
      });

      if (!permission) {
        throw new Error("Berechtigung nicht gefunden");
      }

      const currentUserIds = permission.users.map((user) => user.id);

      const usersToDisconnect = currentUserIds.filter(
        (id) => !users.includes(id)
      );

      const usersToConnect = users.filter((id) => !currentUserIds.includes(id));

      await prisma.permission.update({
        where: {
          id: id,
          organizationId: session.organizationId as string,
        },
        data: {
          name: name,
          description: description,
          isAdmin: isAdmin,
          createOrganization: createOrganization,
          readOrganization: readOrganization,
          updateOrganization: updateOrganization,
          deleteOrganization: deleteOrganization,
          createInvitation: createInvitation,
          readInvitation: readInvitation,
          updateInvitation: updateInvitation,
          deleteInvitation: deleteInvitation,
          createTower: createTower,
          readTower: readTower,
          updateTower: updateTower,
          deleteTower: deleteTower,
          createTowerday: createTowerday,
          readTowerday: readTowerday,
          updateTowerday: updateTowerday,
          deleteTowerday: deleteTowerday,
          completeTowerday: completeTowerday,
          createDutyplan: createDutyplan,
          readDutyplan: readDutyplan,
          updateDutyplan: updateDutyplan,
          deleteDutyplan: deleteDutyplan,
          createUser: createUser,
          readUser: readUser,
          updateUser: updateUser,
          deleteUser: deleteUser,
          createProtocol: createProtocol,
          readProtocol: readProtocol,
          updateProtocol: updateProtocol,
          deleteProtocol: deleteProtocol,
          completeProtocol: completeProtocol,
          createRevision: createRevision,
          readRevision: readRevision,
          updateRevision: updateRevision,
          deleteRevision: deleteRevision,
          createAccomodation: createAccomodation,
          readAccomodation: readAccomodation,
          updateAccomodation: updateAccomodation,
          deleteAccomodation: deleteAccomodation,
          createBooking: createBooking,
          readBooking: readBooking,
          updateBooking: updateBooking,
          deleteBooking: deleteBooking,
          createPermission: createPermission,
          readPermission: readPermission,
          updatePermission: updatePermission,
          deletePermission: deletePermission,
          users: {
            disconnect: usersToDisconnect.map((id) => ({ id })),
            connect: usersToConnect.map((user) => ({ id: user.id })),
          },
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren der Berechtigung");
    }

    revalidatePath("/", "layout");

    return { message: `Die Berechtigung wurde aktualisiert` };
  }
);

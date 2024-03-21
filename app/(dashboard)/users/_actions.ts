"use server";
import { createUserSchema, deleteSchema } from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { toLowercaseAndTrim } from "@/utils";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const deleteUser = authAction("deleteUser")(
  deleteSchema,
  async ({ id }, { session }) => {
    try {
      if (session.id === id) {
        throw new Error("Sie können sich nicht selbst löschen");
      }

      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { id: id, organizationId: session.organizationId },
            select: {
              id: true,
              organizationId: true,
            },
          });

          if (!user) {
            throw new Error("Benutzer nicht gefunden");
          }

          await tx.user.delete({
            where: {
              id: user.id,
            },
          });

          await clerkClient.users.deleteUser(user.id);
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim löschen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: "Benutzer wurde gelöscht" };
  }
);

export const createUser = authAction("createUser")(
  createUserSchema,
  async (
    { email, password, firstName, lastName, birthDate, permissionId },
    { session }
  ) => {
    const createClerkUser = await clerkClient.users.createUser({
      emailAddress: new Array(toLowercaseAndTrim(email)),
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    if (!createClerkUser) {
      throw new Error("Fehler beim erstellen des Benutzer");
    }
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.user.create({
            data: {
              id: createClerkUser.id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              birthDate: birthDate,
              organization: { connect: { id: session.organizationId } },
              permissions: { connect: { id: permissionId } },
            },
          });

          await clerkClient.users.updateUser(createClerkUser.id, {
            publicMetadata: {
              organizationId: session.organizationId,
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      await clerkClient.users.deleteUser(createClerkUser.id);
      throw new Error("Fehler beim erstellen des Benutzer");
    }

    revalidatePath("/", "layout");

    return { message: "Benutzer wurde erstellt" };
  }
);

"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { authAction } from "@/server/lib/utils/action-clients";
import { organizationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

export const createOrg = authAction()(
  organizationSchema,
  async ({ name }, { session }) => {
    let organization;

    try {
      await prisma.$transaction(
        async (tx) => {
          organization = await tx.organization.create({
            data: {
              name: name,
              members: {
                connect: { id: session.id },
              },
            },
            select: {
              id: true,
              name: true,
            },
          });

          await tx.permission.create({
            data: {
              name: "Admin",
              description:
                "Admin Rolle für die Organisation, durch diese Rolle hat der Benutzer alle Rechte in der Organisation.",
              isAdmin: true,
              organization: {
                connect: {
                  id: organization.id,
                },
              },
              users: {
                connect: {
                  id: session.id,
                },
              },
            },
          });

          

          await clerkClient.users.updateUserMetadata(session.id, {
            publicMetadata: {
              organizationId: organization.id,
            },
          });
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
      // Start a transaction
    } catch (error) {
      // If any operation fails, remove the organization id from the user in Clerk
      await clerkClient.users.updateUserMetadata(session.id, {
        publicMetadata: {
          organizationId: undefined,
        },
      });

      // Delete the organization
      if (organization && organization.id) {
        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        });
      }

      throw new Error("Fehler beim Erstellen der Organisation");
    }
    revalidatePath("/organization", "page");
    return {
      message: "Sie haben eine Organisation erstellt und können nun loslegen!",
    };
  }
);

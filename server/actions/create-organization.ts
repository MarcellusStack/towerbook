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
      organization = await prisma.organization.create({
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

      if (!organization.id) {
        throw new Error("Missing organization id");
      }

      const permission = prisma.permission.create({
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

      // Execute the transaction
      await prisma.$transaction([permission]);

      const bucket = await supabase.storage.createBucket(organization.id, {
        public: true,
        fileSizeLimit: 5242880,
      });

      if (bucket.error) {
        throw new Error("Konnte Bucket nicht erstellen");
      }

      await clerkClient.users.updateUserMetadata(session.id, {
        privateMetadata: {
          organizationId: organization.id,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      // If any operation fails, delete the organization
      if (organization && organization.id) {
        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        });
      }
      throw new Error("Fehler beim Erstellen der Organisation");
    }
    return {
      message: "Sie haben eine Organisation erstellt und können nun loslegen!",
    };
  }
);

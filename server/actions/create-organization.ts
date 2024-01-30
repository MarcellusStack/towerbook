"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { authAction } from "@/server/lib/utils/action-clients";
import { organizationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

export const createOrg = authAction(
  organizationSchema,
  async ({ name }, { session }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const organization = await tx.organization.create({
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

          const bucket = await supabase.storage.createBucket(organization.id, {
            public: true,
            fileSizeLimit: 5242880,
          });

          if (bucket.error) {
            throw new Error("Couldnt create bucket");
          }

          await tx.user.update({
            where: {
              id: session.id,
            },
            data: {
              role: {
                set: ["admin"],
              },
            },
            select: {
              role: true,
            },
          });

          await clerkClient.users.updateUserMetadata(session.id, {
            privateMetadata: {
              organizationId: organization.id,
            },
            publicMetadata: {
              organizationName: organization.name,
            },
          });

          revalidatePath("/", "layout");
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim Erstellen der Organisation");
    }
    return {
      message: "Sie haben eine Organisation erstellt und können nun loslegen!",
    };
  }
);

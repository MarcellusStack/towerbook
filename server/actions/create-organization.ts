"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { authAction } from "@/server/lib/utils/action-clients";
import { organizationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

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

          const user = await tx.user.update({
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

          if (!user.role.includes("admin")) {
            throw new Error("Missing admin role");
          }
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

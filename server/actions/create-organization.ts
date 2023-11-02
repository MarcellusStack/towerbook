"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { authAction } from "@/server/lib/utils/action-clients";
import { organizationSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const createOrg = authAction(
  organizationSchema,
  async ({ name }, { user }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const organization = await tx.organization.create({
            data: {
              name: name,
              members: {
                connect: { userId: user.id },
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

          const profile = await tx.profile.update({
            where: {
              userId: user.id,
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

          if (!profile.role.includes("admin")) {
            throw new Error("Missing admin role");
          }
          revalidatePath("/dashboard");
        },
        {
          maxWait: 15000, // default: 2000
          timeout: 15000, // default: 5000
        }
      );
    } catch (error) {
      throw new Error("Fehler beim Erstellen der Organisation");
    }
    return "Sie haben eine Organisation erstellt und können nun loslegen!";
  }
);

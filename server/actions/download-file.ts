"use server";

import { supabase } from "@server/supabase";
import { adminAction, authAction } from "@server/lib/utils/action-clients";
import { downloadFileSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";
import { decode } from "base64-arraybuffer";
import { prisma } from "@server/db";

export const downloadFile = authAction()(
  downloadFileSchema,
  async ({ fileName, field }, { session }) => {
    try {
      const checkValidOrganization = await prisma.user.findFirst({
        where: {
          [field]: fileName,
          organizationId: session.organizationId,
        },
      });

      if (!checkValidOrganization) {
        throw new Error(
          "Datei konnte nicht gefunden werden oder Sie haben keine Berechtigung diese Datei herunterzuladen"
        );
      }

      const { data, error } = await supabase.storage
        .from(`certificates`)
        .createSignedUrl(`${session.organizationId}/${fileName}`, 30, {
          download: true,
        });

      if (error) {
        throw new Error("Datei konnte nicht heruntergeladen werden");
      }

      return data.signedUrl;
    } catch (error) {
      throw new Error("Fehler beim hochladen der Datei");
    }
  }
);

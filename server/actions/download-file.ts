"use server";

import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { downloadFileSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";
import { decode } from "base64-arraybuffer";

export const downloadFile = adminAction(
  downloadFileSchema,
  async ({ fileName }, { user }) => {
    try {
      const { data, error } = await supabase.storage
        .from(user.organizationId as string)
        .createSignedUrl(`${fileName}`, 30, {
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

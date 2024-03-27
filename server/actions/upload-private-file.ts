"use server";

import { supabase } from "@server/supabase";
import { authAction } from "@server/lib/utils/action-clients";
import { uploadFileSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { base64ToBlob } from "@/utils";

export const uploadPrivateFile = authAction()(
  uploadFileSchema,
  async ({ file, fileName }, { session }) => {
    try {
      const { blob, type } = base64ToBlob(file);

      const uploadFile = await supabase.storage
        .from("certificates")
        .upload(`${session.organizationId}/${fileName}.${type}`, blob, {
          upsert: true,
          cacheControl: "0",
        });

      if (uploadFile.error) {
        throw new Error("Datei konnte nicht hochgeladen werden");
      }

      revalidatePath("/", "layout");

      return { message: `Datei hochgeladen` };
    } catch (error) {
      throw new Error("Fehler beim hochladen der Datei");
    }
  }
);

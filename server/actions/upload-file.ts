"use server";

import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { uploadFileSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";
import { decode } from "base64-arraybuffer";

export const uploadFile = adminAction(
  uploadFileSchema,
  async ({ file, fileName, userId }, { user }) => {
    try {
      //for security reasons its better to create signed Upload Urls for MVP reasons we skip this here and will add it later
      //due to extra database token savings and time because the signed upload urls are valid for 2 hours
      /* const uploadUrl = await supabase.storage
        .from(user.organizationId as string)
        .createSignedUploadUrl(fileName);

      if (uploadUrl.error) {
        throw new Error("Signierte URL konnte nicht erstellt werden");
      } */

      const uploadFile = await supabase.storage
        .from(user.organizationId as string)
        .upload(`${fileName}`, decode(file), {
          upsert: true,
          cacheControl: "0",
        });

      if (uploadFile.error) {
        console.log(uploadFile.error);
        throw new Error("Datei konnte nicht hochgeladen werden");
      }

      revalidateTag(userId);
      revalidateTag("users");

      return `Datei hochgeladen`;
    } catch (error) {
      throw new Error("Fehler beim hochladen der Datei");
    }
  }
);

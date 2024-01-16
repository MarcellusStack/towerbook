"use server";

import { action } from "@/server/lib/utils/action-clients";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const refreshSession = action(z.object({}), async () => {
  revalidatePath("/", "layout");

  return { message: "Sitzung aktualisiert" };
});

"use server";

import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { authSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";

export const refreshSession = action(z.object({}), async () => {
  revalidatePath("/", "layout");

  return { message: "Sitzung aktualisiert" };
});

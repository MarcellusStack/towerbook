"use server";

import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { authSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const signOut = action(authSchema, async () => {
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/sign-in");
});

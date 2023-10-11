"use server";

import { supabase } from "@server/supabase";
import { action } from "@/server/lib/utils/action-clients";
import { authSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const signIn = action(authSchema, async ({ email, password }) => {
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/");
});

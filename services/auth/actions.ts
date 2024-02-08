"use server";

import { action } from "@server/lib/utils/action-clients";
import { authSchema } from "@schemas/index";
import { signIn, signOut } from "@/server/lib/auth";
import { z } from "zod";

export const login = action(authSchema, async ({ email, password }) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
  } catch (error) {
    throw new Error(error);
  }

  return {
    message: `Erfolgreich angemeldet`,
  };
});

export const logout = action(z.object({}), async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    throw new Error(error);
  }

  return {
    message: `Erfolgreich abgemeldet`,
  };
});

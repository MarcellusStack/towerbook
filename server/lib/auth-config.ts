import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { authSchema } from "@/schemas";
import { getUserById } from "@/services/user/queries";
import { supabase } from "@server/supabase";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Keine Anmeldedaten gefunden");
        }

        const { email, password } = credentials as Record<string, string>;

        const parseCredentials = authSchema.safeParse(credentials);
        if (!parseCredentials.success) {
          throw new Error(parseCredentials.error.message);
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        const user = await getUserById(data.user.id);

        if (!user) {
          throw new Error("Wir konnten keine Berechtigungen finden");
        }

        if (!user.emailVerified) {
          throw new Error("Bitte bestätige deine E-Mail-Adresse");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId ?? null,
          organizationName: user.organization?.name ?? null,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

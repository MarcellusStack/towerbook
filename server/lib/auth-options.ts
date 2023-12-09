import { authSchema } from "@/schemas";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@server/supabase";
import { prisma } from "@server/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Keine Anmeldedaten gefunden");
        }

        const { email, password } = credentials;

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

        const user = await prisma.profile.findUnique({
          where: { userId: data.user.id },
          select: { role: true, organizationId: true },
        });

        if (!user) {
          throw new Error("Wir konnten keine Berechtigungen finden");
        }

        return {
          id: data.user.id,
          email: data.user.email,
          organizationId: user.organizationId ?? null,
          role: user.role,
        };
      },
    }),
  ],
  events: {
    async signOut(token, session) {
      await prisma.profile.update({
        where: { userId: token.token.id },
        data: { lastLogout: new Date() },
        select: { id: true },
      });
    },
  },
  callbacks: {
    async signIn(user) {
      await prisma.profile.update({
        where: { userId: user.user.id },
        data: { lastLogin: new Date() },
        select: { id: true },
      });
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.organizationId = user.organizationId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.organizationId = token.organizationId;
      session.user.role = token.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
};

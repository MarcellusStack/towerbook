import NextAuth from "next-auth";
import { getUserById } from "@/services/user/queries";
import { updateUserById } from "@/services/user/actions";
import authConfig from "@server/lib/auth-config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  events: {
    async signOut(token, session) {
      await updateUserById(token.id, { lastLogout: new Date() });
    },
  },
  callbacks: {
    async signIn(user) {
      await updateUserById(user.user.id, { lastLogin: new Date() });
      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.id = user.id;
      token.email = user.email;
      token.role = user.role;
      token.organizationId = user.organizationId;
      token.organizationName = user.organization?.name ?? null;

      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.organizationId = token.organizationId;
        session.user.organizationName = token.organizationName;
      }

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

  ...authConfig,
});

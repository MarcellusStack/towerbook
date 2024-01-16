import NextAuth from "next-auth";

import authConfig from "@server/lib/auth-config";
import { authRoutes, protectedRoutes } from "@constants/index";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );

  if (!isAuthenticated && isProtectedRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

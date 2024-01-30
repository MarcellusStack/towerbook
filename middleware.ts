import { publicRoutes, protectedRoutes } from "@constants/index";

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    const { nextUrl } = req;

    const isProtectedRoute = protectedRoutes.some((prefix) =>
      nextUrl.pathname.startsWith(prefix)
    );

    if (!auth.userId && isProtectedRoute) {
      return Response.redirect(new URL("/sign-in", nextUrl));
    }

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (auth.userId) {
      const userMetadata = await clerkClient.users.getUser(auth.userId);
      console.log(userMetadata.publicMetadata.firstName);

      // Redirect logged in users that are missing firstname, lastname, birthday to onboarding
      if (
        userMetadata.publicMetadata.firstName === undefined ||
        userMetadata.publicMetadata.lastName === undefined ||
        userMetadata.publicMetadata.birthDate === undefined
      ) {
        if (nextUrl.pathname !== "/onboarding") {
          const onboarding = new URL("/onboarding", req.url);
          return Response.redirect(onboarding);
        }
      }
      // Redirect logged in users that are missing organization name and id to organization
      else if (
        userMetadata.publicMetadata.organizationName === undefined ||
        userMetadata.privateMetadata.organizationId === undefined
      ) {
        if (nextUrl.pathname !== "/organization") {
          const organization = new URL("/organization", req.url);
          return Response.redirect(organization);
        }
      }
      // If all required data is defined, redirect to dashboard
      else if (isPublicRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

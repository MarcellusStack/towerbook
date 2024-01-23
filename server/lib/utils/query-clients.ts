"use server";
import { Role } from "@prisma/client";
import { GetUserProps } from "@server/lib/utils/get-user";
import { auth } from "@server/lib/auth";

export const authFilterQuery =
  <T>(
    queryFunction: (
      search: string | undefined,
      session: GetUserProps
    ) => Promise<T | null>
  ) =>
  async (search: string, requiredRoles: Role[] = []): Promise<T | null> => {
    const session = await auth();

    if (!session) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (requiredRoles.length === 0) {
      return queryFunction(search, session.user);
    }

    if (!requiredRoles.some((role) => session.user.role.includes(role))) {
      return null;
    }

    return queryFunction(search, session.user);
  };

export const authQuery =
  <T>(queryFunction: (session: GetUserProps) => Promise<T | null>) =>
  async (requiredRoles: string[] = []): Promise<T | null> => {
    const session = await auth();

    if (!session) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (requiredRoles.length === 0) {
      return queryFunction(session.user);
    }

    if (!requiredRoles.some((role) => session.user.role.includes(role))) {
      return null;
    }

    return queryFunction(session.user);
  };

export const authAdminQuery =
  <T>(queryFunction: (session: GetUserProps) => Promise<T>) =>
  async (): Promise<T> => {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (!session.user.role.includes("admin")) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return queryFunction(session.user);
  };

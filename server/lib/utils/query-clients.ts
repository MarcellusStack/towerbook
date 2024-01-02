import { GetUserProps, getUser } from "@server/lib/utils/get-user";

export const authFilterQuery =
  (queryFunction: (search: string | undefined, user: GetUserProps) => void) =>
  async (search: string, requiredRoles: string[] = []) => {
    const user = await getUser();

    if (!user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (requiredRoles.length === 0) {
      return queryFunction(search, user);
    }

    if (!requiredRoles.some((role) => user.role.includes(role))) {
      return [];
    }

    return queryFunction(search, user);
  };

export const authQuery =
  (queryFunction: (user: GetUserProps) => void) =>
  async (requiredRoles: string[] = []) => {
    const user = await getUser();

    if (!user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (requiredRoles.length === 0) {
      return queryFunction(user);
    }

    if (!requiredRoles.some((role) => user.role.includes(role))) {
      return [];
    }

    return queryFunction(user);
  };

export const authAdminQuery =
  <T>(queryFunction: (user: GetUserProps) => Promise<T>) =>
  async (): Promise<T> => {
    const user = await getUser();

    if (!user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (!user.role.includes("admin")) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return queryFunction(user);
  };

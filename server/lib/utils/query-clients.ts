import { getUser } from "@server/lib/utils/get-user";

export type UserProps = {
  id: string;
  profileId: string;
  email: string;
  organizationId: string;
  role: string[];
};

export const authFilterQuery =
  (queryFunction: (search: string | undefined, user: UserProps) => void) =>
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
  (queryFunction: (user: UserProps) => void) =>
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

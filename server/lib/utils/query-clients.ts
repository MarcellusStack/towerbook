import { getUser } from "@server/lib/utils/get-user";

export type UserProps = {
  id: string;
  profileId: string;
  email: string;
  organizationId: string;
  role: string[];
};

export const authQuery =
  (queryFunction: (search: string, user: UserProps) => void) =>
  async (search: string, requiredRoles: string[] = []) => {
    const user = await getUser();

    if (!user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    if (requiredRoles.length === 0) {
      return queryFunction(search, user);
    }

    if (!requiredRoles.every((role) => user.role.includes(role))) {
      return [];
    }

    return queryFunction(search, user);
  };

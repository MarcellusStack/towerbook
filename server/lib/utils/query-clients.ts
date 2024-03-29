import { auth } from "@clerk/nextjs";
import { SessionProps, getSession } from "@/server/lib/utils/get-session";

type AuthFilterQueryFunction<T> = (
  search: string | undefined,
  session: SessionProps
) => Promise<T | null>;

export const authFilterQuery =
  <T>(queryFunction: AuthFilterQueryFunction<T>, permission?: string) =>
  async (search: string): Promise<T | null> => {
    const { userId } = auth();

    const user = await getSession(userId);

    // Check if the user is an admin or has the necessary permission
    const isAdmin = user.permissions.some((p) => p.isAdmin);
    const hasPermission = permission
      ? user.permissions.some((p) => p[permission])
      : true;

    if (!(isAdmin || hasPermission)) {
      throw new Error(`Sie verfügen nicht über die nötigen Berechtigungen`);
    }

    return queryFunction(search, user);
  };

type AuthQueryFunction<T> = (session: SessionProps) => Promise<T | null>;

export const authQuery =
  <T>(queryFunction: AuthQueryFunction<T>, permission?: string) =>
  async (): Promise<T | null> => {
    const { userId } = auth();

    const user = await getSession(userId);

    // Check if the user is an admin or has the necessary permission
    const isAdmin = user.permissions.some((p) => p.isAdmin);
    const hasPermission = permission
      ? user.permissions.some((p) => p[permission])
      : true;

    if (!(isAdmin || hasPermission)) {
      throw new Error(`Sie verfügen nicht über die nötigen Berechtigungen`);
    }

    return queryFunction(user);
  };

export const authAdminQuery =
  <T>(queryFunction: (session: SessionProps) => Promise<T>) =>
  async (): Promise<T> => {
    const { userId } = auth();

    const user = await getSession(userId);

    return queryFunction(user);
  };

"use server";
import { auth } from "@clerk/nextjs";
import { SessionProps, getSession } from "@/server/lib/utils/get-session";

type QueryFunction<T> = (
  search: string | undefined,
  session: SessionProps
) => Promise<T | null>;

export const authFilterQuery =
  <T>(queryFunction: QueryFunction<T>, permission?: string) =>
  async (search: string): Promise<T | null> => {
    const { userId } = auth();

    const user = await getSession(userId);

    // If a permission is provided, check if the user has the necessary permission
    if (permission && !user.permissions.some((p) => p[permission] === true)) {
      throw new Error(`Berechtigung ${permission} wird benötigt`);
    }

    return queryFunction(search, user);
  };

export const authQuery =
  <T>(queryFunction: (session: SessionProps) => Promise<T | null>) =>
  async (): Promise<T | null> => {
    const { userId } = auth();

    const user = await getSession(userId);

    return queryFunction(user);
  };

export const authAdminQuery =
  <T>(queryFunction: (session: SessionProps) => Promise<T>) =>
  async (): Promise<T> => {
    const { userId } = auth();

    const user = await getSession(userId);

    return queryFunction(user);
  };

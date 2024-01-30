"use server";
import { auth } from "@clerk/nextjs";
import { SessionProps, getSession } from "@/server/lib/utils/get-session";

export const authFilterQuery =
  <T>(
    queryFunction: (
      search: string | undefined,
      session: SessionProps
    ) => Promise<T | null>
  ) =>
  async (search: string): Promise<T | null> => {
    const { userId } = auth();

    const user = await getSession(userId);

    console.log(user);

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

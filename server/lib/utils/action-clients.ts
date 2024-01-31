import { createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs";
import { getSession, type SessionProps } from "@/server/lib/utils/get-session";
import { ZodType } from "zod";

export const action = createSafeActionClient();

export const authAction = (permission?: string) =>
  createSafeActionClient({
    async middleware() {
      const { userId } = auth();

      const user = await getSession(userId);

      // If a permission is provided, check if the user has the necessary permission
      if (permission && !user.permissions.some((p) => p[permission])) {
        throw new Error(`Berechtigung wird benötigt`);
      }

      return { session: user };
    },
    handleReturnedServerError(e) {
      return { serverError: e.message };
    },
  });

export const adminAction = createSafeActionClient({
  async middleware() {
    const { userId } = auth();

    const user = await getSession(userId);

    return { session: user };
  },
});

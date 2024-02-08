import { createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs";
import { getSession } from "@/server/lib/utils/get-session";

export const action = createSafeActionClient();

export const authAction = (permission?: string) =>
  createSafeActionClient({
    async middleware() {
      const { userId } = auth();

      const user = await getSession(userId);

      // Check if the user is an admin
      const isAdmin = user.permissions.some((p) => p.isAdmin);

      // If a specific permission is provided, check if the user has the necessary permission
      const hasPermission = permission
        ? user.permissions.some((p) => p[permission])
        : true;

      if (!(isAdmin || hasPermission)) {
        throw new Error(`Sie verfügen nicht über die nötigen Berechtigungen`);
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

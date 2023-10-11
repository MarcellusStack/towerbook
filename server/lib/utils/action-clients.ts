import { createSafeActionClient } from "next-safe-action";
import { getUser } from "@server/lib/utils/get-user";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const user = await getUser();

    if (!user) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return { user };
  },
});

export const adminAction = createSafeActionClient({
  async middleware() {
    const user = await getUser();

    if (!user || !user.role.includes("admin")) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return { user };
  },
});

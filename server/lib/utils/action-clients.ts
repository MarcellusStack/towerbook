import { createSafeActionClient } from "next-safe-action";
import { auth } from "@server/lib/auth";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await auth();

    if (!session) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return { session: session.user };
  },
});

export const adminAction = createSafeActionClient({
  async middleware() {
    const session = await auth();

    if (!session || !session.user.role.includes("admin")) {
      throw new Error("Sie haben keine Berechtigung für diese Aktion");
    }

    return { session: session.user };
  },
});

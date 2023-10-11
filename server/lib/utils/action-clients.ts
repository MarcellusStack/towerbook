import { createSafeActionClient } from "next-safe-action";
import { getUser } from "@server/lib/utils/get-user";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const user = await getUser();

    if (!user) {
      throw new Error("Keine Berechtiung für diese Aktion");
    }

    return { user };
  },
});

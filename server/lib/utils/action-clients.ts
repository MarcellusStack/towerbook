import { createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs";
import { getSession } from "@/server/lib/utils/get-session";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const { userId } = auth();

    const user = await getSession(userId);

    return { session: user };
  },
});

export const adminAction = createSafeActionClient({
  async middleware() {
    const { userId } = auth();

    const user = await getSession(userId);

    return { session: user };
  },
});

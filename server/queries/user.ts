import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";

import { type User, Role } from "@prisma/client";

export type UserSettingsProps = Pick<User, "email">;

export const getUserSettings = authQuery(async (session) => {
  return await prisma.user.findFirst({
    where: {
      id: session.id,
    },
    select: {
      email: true,
    },
  });
});

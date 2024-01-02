import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";

import { type Profile, Role } from "@prisma/client";

export type UserSettingsProps = Pick<Profile, "email">;

export const getUserSettings = authQuery(async (user) => {
  return await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      email: true,
    },
  });
}) as (user: Role[]) => Promise<UserSettingsProps[]>;

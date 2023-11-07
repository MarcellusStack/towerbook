import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";

import { type Profile, Role } from "@prisma/client";

export type UserTasksProps = Pick<Profile, "id" | "firstName" | "lastName">;

//query for getting users for example to assign guardLeader and towerLeader in create tower
//still needs optimization because we dont want to query all and use a search function
export const getUsersForTasks = authQuery(async (user) => {
  return await prisma.profile.findMany({
    where: {
      organizationId: user.organizationId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}) as (user: Role[]) => Promise<UserTasksProps[]>;

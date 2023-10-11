import { getUser } from "@server/lib/utils/get-user";
import { prisma } from "@server/db";

export const getUsers = async (search: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error("Sie haben keine Berechtigung für diese Aktion");
  }

  if (!user.role.includes("admin")) {
    return [];
  }

  const users = await prisma.profile.findMany({
    where: search
      ? {
          organizationId: user.organizationId,
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : { organizationId: user.organizationId },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      birthDate: true,
    },
  });
  return users;
};

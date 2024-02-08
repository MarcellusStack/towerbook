"use server";
import { prisma } from "@/server/db";

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      firstName: true,
      lastName: true,
      id: true,
      email: true,
      role: true,
      organizationId: true,
      organization: {
        select: {
          name: true,
        },
      },
    },
  });
};

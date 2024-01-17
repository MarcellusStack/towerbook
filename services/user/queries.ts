"use server";
import { prisma } from "@/server/db";

export const getUserById = async (id: string) => {
  return await prisma.profile.findUnique({
    where: { userId: id },
    select: {
      firstName: true,
      lastName: true,
      userId: true,
      id: true,
      email: true,
      role: true,
      organizationId: true,
      organization: {
        select: {
          name: true,
        },
      },
      emailVerified: true,
    },
  });
};

import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

export const updateUserById = async (
  id: string,
  data: Prisma.ProfileUpdateInput
) => {
  try {
    return await prisma.profile.update({
      where: { userId: id },
      data: data,
    });
  } catch (error) {
    throw new Error("Fehler beim Aktualisieren des Benutzers");
  }
};

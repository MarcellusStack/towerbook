import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

export const updateUserById = async (
  id: string,
  data: Prisma.UserUpdateInput
) => {
  try {
    return await prisma.user.update({
      where: { id: id },
      data: data,
    });
  } catch (error) {
    throw new Error("Fehler beim Aktualisieren des Benutzers");
  }
};

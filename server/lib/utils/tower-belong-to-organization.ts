import { prisma } from "@/server/db";

export const towerBelongsToOrganization = async (
  towerId: string,
  organizationId: string | null
) => {
  const check = await prisma.tower.findFirst({
    where: { id: towerId, organizationId: organizationId },
    select: {
      id: true,
    },
  });

  if (!check || !check.id)
    throw new Error("Towerday does not belong to your organization");
};

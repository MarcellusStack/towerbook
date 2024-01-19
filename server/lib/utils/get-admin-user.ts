import { auth } from "@server/lib/auth";

import { prisma } from "@/server/db";

export const getAdminUser = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { id: true, email: true, role: true, organizationId: true },
  });

  return {
    id: user?.id,
    email: user?.email,
    role: user?.role,
    organizationId: user?.organizationId,
  };
};

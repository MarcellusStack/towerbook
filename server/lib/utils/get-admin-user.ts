import { auth } from "@server/lib/auth";
import { authOptions } from "@server/lib/auth-options";
import { prisma } from "@/server/db";

export const getAdminUser = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.profile.findFirst({
    where: { userId: session.user.id },
    select: { userId: true, email: true, role: true, organizationId: true },
  });

  return {
    id: user?.userId,
    email: user?.email,
    role: user?.role,
    organizationId: user?.organizationId,
  };
};

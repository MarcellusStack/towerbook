import { getServerSession } from "next-auth/next";
import { authOptions } from "@server/lib/auth-options";
import { prisma } from "@/server/db";

export const getUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.profile.findFirst({
    where: { userId: session.user.id },
    select: {
      userId: true,
      id: true,
      email: true,
      role: true,
      organizationId: true,
    },
  });

  return {
    id: user?.userId,
    profileId: user?.id,
    email: user?.email,
    role: user?.role,
    organizationId: user?.organizationId,
  };
};

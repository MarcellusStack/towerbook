import { getServerSession } from "next-auth/next";
import { authOptions } from "@server/lib/auth-options";
import { prisma } from "@/server/db";
import { cache } from "react";

export type GetUserProps = {
  id: string;
  profileId: string;
  email: string;
  role: string[];
  organizationId: string | null;
};

export const getUser: () => Promise<GetUserProps | null> = cache(async () => {
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

  if (!user) {
    return null;
  }

  return {
    id: user.userId,
    profileId: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
  };
});

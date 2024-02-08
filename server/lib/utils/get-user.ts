import { auth } from "@server/lib/auth";
import { authOptions } from "@server/lib/auth-options";
import { prisma } from "@/server/db";
import { cache } from "react";

export type GetUserProps = {
  id: string;
  profileId: string;
  email: string;
  role: string[];
  organizationId: string | null;
  organizationName: string | undefined;
};

export const getUser: () => Promise<GetUserProps | null> = cache(async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user?.id },
    select: {
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

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
    organizationName: user.organization?.name,
  };
});

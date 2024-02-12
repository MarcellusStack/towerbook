"use server";
import { authQuery } from "@/server/lib/utils/query-clients";
import { toLowercaseAndTrim } from "@/utils";
import { prisma } from "@server/db";

export const getInvitations = authQuery(async (session) => {
  return await prisma.invitation.findMany({
    where: {
      email: toLowercaseAndTrim(session.email),
    },
    select: {
      id: true,
    },
  });
});

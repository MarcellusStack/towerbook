"use server";
import { prisma } from "@server/db";
import { authFilterQuery, authQuery } from "@server/lib/utils/query-clients";
import { Role, type Invitation, Organization } from "@prisma/client";

export type InvitationProps = Pick<Invitation, "id" | "email">;

export type InvitationExtendedProps = InvitationProps & {
  organization: Pick<Organization, "id" | "name">;
};

export const getInvitations = authFilterQuery(async (search, session) => {
  return await prisma.invitation.findMany({
    where: {
      organizationId: session.organizationId as string,
      email: {
        contains: search ?? undefined,
      },
    },
    select: {
      id: true,
      email: true,
    },
  });
});

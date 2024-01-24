"use server";
import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { Role, type Invitation, Organization } from "@prisma/client";

export type InvitationProps = Pick<Invitation, "id" | "email" | "role">;

export type InvitationExtendedProps = InvitationProps & {
  organization: Pick<Organization, "id" | "name">;
};

export const getInvitations = authQuery(async (session) => {
  return await prisma.invitation.findMany({
    where: {
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}) as (requiredRoles: Role[]) => Promise<InvitationProps[]>;

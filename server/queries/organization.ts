"use server";
import { prisma } from "@server/db";
import { authAdminQuery } from "@server/lib/utils/query-clients";

import { type Organization } from "@prisma/client";

export type OrganizationSettingsProps = Pick<
  Organization,
  "name" | "towerLocations" | "todo" | "beachSections" | "weather" | "material"
>;

export const getOrganizationSettings =
  authAdminQuery<OrganizationSettingsProps>(async (session) => {
    const organization = await prisma.organization.findFirst({
      where: {
        id: session.organizationId as string,
      },
      select: {
        name: true,
        towerLocations: true,
        todo: true,
        beachSections: true,
        weather: true,
        material: true,
      },
    });

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  });

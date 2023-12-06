import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { type Role } from "@prisma/client";
import { GroupRegistrationProps } from "@server/queries/get-group-registrations";

export const getTowerGroupRegistrations = authFilterQuery(
  async (search, user) => {
    return await prisma.groupRegistration.findMany({
      where: {
        organizationId: user.organizationId as string,
        towerId: search,
      },
      select: {
        id: true,
        date: true,
        time: true,
        name: true,
        count: true,
        supervisorFirstName: true,
        supervisorLastName: true,
      },
    });
  }
) as (
  search: string,
  requiredRoles: Role[]
) => Promise<GroupRegistrationProps[]>;

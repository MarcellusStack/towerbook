import { prisma } from "@server/db";
import { authQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUserAccount = authQuery(async (search, user) => {
  const userData = await unstable_cache(
    async (search) => {
      const query = await prisma.profile.findFirst({
        where: {
          organizationId: user.organizationId,
          userId: search,
        },
        select: {
          picture: true,
          gender: true,
          firstName: true,
          lastName: true,
          salutation: true,
          title: true,
          birthName: true,
          birthDate: true,
          birthPlace: true,
          street: true,
          houseNumber: true,
          zipCode: true,
          location: true,
          email: true,
          phone: true,
          drkMember: true,
          drkMemberLocation: true,
          emergencyContactLastName: true,
          emergencyContactFirstName: true,
          emergencyContactPhone: true,
          bankName: true,
          iban: true,
          bic: true,
          differentBankholder: true,
          userId: true,
        },
      });
      return query;
    },
    [],
    {
      tags: [search],
      revalidate: 1,
    }
  )(search);
  return userData;
});

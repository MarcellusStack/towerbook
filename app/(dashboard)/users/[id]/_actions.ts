"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getUserLayout = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      id: search,
      organizationId: session.organizationId as string,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
      phone: true,
    },
  });
}, "readUser");

export type UserLayoutProps = NonNullable<
  Awaited<ReturnType<typeof getUserLayout>>
>;

export const getUserDashboard = authFilterQuery(async (search, session) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      firstName: true,
      lastName: true,
      title: true,
      birthDate: true,
      email: true,
      phone: true,
      towers: true,
      shifts: {
        select: {
          id: true,
          type: true,
          startTime: true,
          endTime: true,
        },
      },
      bookings: {
        where: {
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
          date: true,
          status: true,
          accomodation: {
            select: {
              street: true,
              zipCode: true,
              location: true,
            },
          },
        },
      },
    },
  });
}, "readUser");

export type UserDashboardProps = NonNullable<
  Awaited<ReturnType<typeof getUserDashboard>>
>;

"use server";
import { prisma } from "@/server/db";
import { authFilterQuery } from "@/server/lib/utils/query-clients";

export const getUserCertificate = authFilterQuery(async (search, session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: search,
    },
    select: {
      id: true,
      lifeguardLicense: true,
      snorkelLicense: true,
      lifeguardWaterRescueService: true,
      waterRescuer: true,
      riverRescuer: true,
      medicalTraining: true,
      paramedicHelper: true,
      paramedic: true,
      paramedicAssistance: true,
      paramedicEmergency: true,
      physician: true,
      physicianEmergency: true,
      squadLeader: true,
      groupLeader: true,
      guardLeader: true,
      trainLeader: true,
      carDrivingLicense: true,
      blueLightInstruction: true,
      boatmanLake: true,
      boatmanInland: true,
      lifeboatOperator: true,
      rwcPilotStage: true,
      srcCertificate: true,
      bosCertificate: true,
      droneClass: true,
      volunteerDataSheet: true,
      youthLeaderCard: true,
      instructorSwimmer: true,
      lifeguardInstructor: true,
      instructorWaterRescuer: true,
      instructorMedicalService: true,
      guardWalker: true,
      boat: true,
      car: true,
      rwc: true,
      guardLeaderInstruction: true,
    },
  });
}, "readUser");

export type UserCertificateProps = NonNullable<
  Awaited<ReturnType<typeof getUserCertificate>>
>;

import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";

import { type User, Role } from "@prisma/client";

export type UserCertificateProps = Pick<
  User,
  | "id"
  | "lifeguardLicense"
  | "snorkelLicense"
  | "lifeguardWaterRescueService"
  | "waterRescuer"
  | "riverRescuer"
  | "medicalTraining"
  | "paramedicHelper"
  | "paramedic"
  | "paramedicAssistance"
  | "paramedicEmergency"
  | "physician"
  | "physicianEmergency"
  | "squadLeader"
  | "groupLeader"
  | "guardLeader"
  | "trainLeader"
  | "carDrivingLicense"
  | "blueLightInstruction"
  | "boatmanLake"
  | "boatmanInland"
  | "lifeboatOperator"
  | "rwcPilotStage"
  | "srcCertificate"
  | "bosCertificate"
  | "droneClass"
  | "volunteerDataSheet"
  | "youthLeaderCard"
  | "instructorSwimmer"
  | "lifeguardInstructor"
  | "instructorWaterRescuer"
  | "instructorMedicalService"
  | "guardWalker"
  | "boat"
  | "car"
  | "rwc"
  | "guardLeaderInstruction"
>;

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
}) as unknown as (
  search: string,
  requiredRoles: Role[]
) => Promise<UserCertificateProps>;

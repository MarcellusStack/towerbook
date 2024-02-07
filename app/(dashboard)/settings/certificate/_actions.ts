"use server";
import { certificateSchema } from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { authQuery } from "@/server/lib/utils/query-clients";
import { revalidatePath } from "next/cache";

export const getUserSettingsCertificate = authQuery(async (session) => {
  return await prisma.user.findFirst({
    where: {
      organizationId: session.organizationId,
      id: session.id,
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
});

export type UserCertificateProps = NonNullable<
  Awaited<ReturnType<typeof getUserSettingsCertificate>>
>;

export const updateUserSettingsCertificate = authAction()(
  certificateSchema,
  async (
    {
      lifeguardLicense,
      snorkelLicense,
      lifeguardWaterRescueService,
      waterRescuer,
      riverRescuer,
      medicalTraining,
      paramedicHelper,
      paramedic,
      paramedicAssistance,
      paramedicEmergency,
      physician,
      physicianEmergency,
      squadLeader,
      groupLeader,
      guardLeader,
      trainLeader,
      carDrivingLicense,
      blueLightInstruction,
      boatmanLake,
      boatmanInland,
      lifeboatOperator,
      rwcPilotStage,
      srcCertificate,
      bosCertificate,
      droneClass,
      volunteerDataSheet,
      youthLeaderCard,
      instructorSwimmer,
      lifeguardInstructor,
      instructorWaterRescuer,
      instructorMedicalService,
      guardWalker,
      boat,
      car,
      rwc,
      guardLeaderInstruction,
    },
    { session }
  ) => {
    try {
      await prisma.user.update({
        where: {
          organizationId: session.organizationId,
          id: session.id,
        },
        data: {
          lifeguardLicense: lifeguardLicense,
          snorkelLicense: snorkelLicense,
          lifeguardWaterRescueService: lifeguardWaterRescueService,
          waterRescuer: waterRescuer,
          riverRescuer: riverRescuer,
          medicalTraining: medicalTraining,
          paramedicHelper: paramedicHelper,
          paramedic: paramedic,
          paramedicAssistance: paramedicAssistance,
          paramedicEmergency: paramedicEmergency,
          physician: physician,
          physicianEmergency: physicianEmergency,
          squadLeader: squadLeader,
          groupLeader: groupLeader,
          guardLeader: guardLeader,
          trainLeader: trainLeader,
          carDrivingLicense: carDrivingLicense,
          blueLightInstruction: blueLightInstruction,
          boatmanLake: boatmanLake,
          boatmanInland: boatmanInland,
          lifeboatOperator: lifeboatOperator,
          rwcPilotStage: rwcPilotStage,
          srcCertificate: srcCertificate,
          bosCertificate: bosCertificate,
          droneClass: droneClass,
          volunteerDataSheet: volunteerDataSheet,
          youthLeaderCard: youthLeaderCard,
          instructorSwimmer: instructorSwimmer,
          lifeguardInstructor: lifeguardInstructor,
          instructorWaterRescuer: instructorWaterRescuer,
          instructorMedicalService: instructorMedicalService,
          guardWalker: guardWalker,
          boat: boat,
          car: car,
          rwc: rwc,
          guardLeaderInstruction: guardLeaderInstruction,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");
    return {
      message: `Der Benutzer wurde aktualisiert`,
    };
  }
);

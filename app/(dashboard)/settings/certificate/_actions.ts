"use server";
import { certificateSchema } from "@/schemas";
import { prisma } from "@/server/db";
import { authAction } from "@/server/lib/utils/action-clients";
import { authQuery } from "@/server/lib/utils/query-clients";
import { convertStringToDateOrNull } from "@/utils";
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
      lifeguardLicenseExpiration: true,
      snorkelLicense: true,
      snorkelLicenseExpiration: true,
      lifeguardWaterRescueService: true,
      lifeguardWaterRescueServiceExpiration: true,
      waterRescuer: true,
      waterRescuerExpiration: true,
      riverRescuer: true,
      riverRescuerExpiration: true,
      medicalTraining: true,
      medicalTrainingExpiration: true,
      paramedicHelper: true,
      paramedicHelperExpiration: true,
      paramedic: true,
      paramedicExpiration: true,
      paramedicAssistance: true,
      paramedicAssistanceExpiration: true,
      paramedicEmergency: true,
      paramedicEmergencyExpiration: true,
      physician: true,
      physicianExpiration: true,
      physicianEmergency: true,
      physicianEmergencyExpiration: true,
      squadLeader: true,
      squadLeaderExpiration: true,
      groupLeader: true,
      groupLeaderExpiration: true,
      guardLeader: true,
      guardLeaderExpiration: true,
      trainLeader: true,
      trainLeaderExpiration: true,
      carDrivingLicense: true,
      carDrivingLicenseExpiration: true,
      blueLightInstruction: true,
      blueLightInstructionExpiration: true,
      boatmanLake: true,
      boatmanLakeExpiration: true,
      boatmanInland: true,
      boatmanInlandExpiration: true,
      lifeboatOperator: true,
      lifeboatOperatorExpiration: true,
      rwcPilotStage: true,
      rwcPilotStageExpiration: true,
      fasty: true,
      fastyExpiration: true,
      srcCertificate: true,
      srcCertificateExpiration: true,
      bosCertificate: true,
      bosCertificateExpiration: true,
      droneClass: true,
      droneClassExpiration: true,
      volunteerDataSheet: true,
      volunteerDataSheetExpiration: true,
      youthLeaderCard: true,
      youthLeaderCardExpiration: true,
      instructorSwimmer: true,
      instructorSwimmerExpiration: true,
      lifeguardInstructor: true,
      lifeguardInstructorExpiration: true,
      instructorWaterRescuer: true,
      instructorWaterRescuerExpiration: true,
      instructorMedicalService: true,
      instructorMedicalServiceExpiration: true,
      guardWalker: true,
      guardWalkerExpiration: true,
      boat: true,
      boatExpiration: true,
      car: true,
      carExpiration: true,
      rwc: true,
      rwcExpiration: true,
      guardLeaderInstruction: true,
      guardLeaderInstructionExpiration: true,
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
      lifeguardLicenseExpiration,
      snorkelLicense,
      snorkelLicenseExpiration,
      lifeguardWaterRescueService,
      lifeguardWaterRescueServiceExpiration,
      waterRescuer,
      waterRescuerExpiration,
      riverRescuer,
      riverRescuerExpiration,
      medicalTraining,
      medicalTrainingExpiration,
      paramedicHelper,
      paramedicHelperExpiration,
      paramedic,
      paramedicExpiration,
      paramedicAssistance,
      paramedicAssistanceExpiration,
      paramedicEmergency,
      paramedicEmergencyExpiration,
      physician,
      physicianExpiration,
      physicianEmergency,
      physicianEmergencyExpiration,
      squadLeader,
      squadLeaderExpiration,
      groupLeader,
      groupLeaderExpiration,
      guardLeader,
      guardLeaderExpiration,
      trainLeader,
      trainLeaderExpiration,
      carDrivingLicense,
      carDrivingLicenseExpiration,
      blueLightInstruction,
      blueLightInstructionExpiration,
      boatmanLake,
      boatmanLakeExpiration,
      boatmanInland,
      boatmanInlandExpiration,
      lifeboatOperator,
      lifeboatOperatorExpiration,
      rwcPilotStage,
      rwcPilotStageExpiration,
      fasty,
      fastyExpiration,
      srcCertificate,
      srcCertificateExpiration,
      bosCertificate,
      bosCertificateExpiration,
      droneClass,
      droneClassExpiration,
      volunteerDataSheet,
      volunteerDataSheetExpiration,
      youthLeaderCard,
      youthLeaderCardExpiration,
      instructorSwimmer,
      instructorSwimmerExpiration,
      lifeguardInstructor,
      lifeguardInstructorExpiration,
      instructorWaterRescuer,
      instructorWaterRescuerExpiration,
      instructorMedicalService,
      instructorMedicalServiceExpiration,
      guardWalker,
      guardWalkerExpiration,
      boat,
      boatExpiration,
      car,
      carExpiration,
      rwc,
      rwcExpiration,
      guardLeaderInstruction,
      guardLeaderInstructionExpiration,
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
          lifeguardLicenseExpiration: convertStringToDateOrNull(
            lifeguardLicenseExpiration
          ),
          snorkelLicense: snorkelLicense,
          snorkelLicenseExpiration: convertStringToDateOrNull(
            snorkelLicenseExpiration
          ),
          lifeguardWaterRescueService: lifeguardWaterRescueService,
          lifeguardWaterRescueServiceExpiration: convertStringToDateOrNull(
            lifeguardWaterRescueServiceExpiration
          ),
          waterRescuer: waterRescuer,
          waterRescuerExpiration: convertStringToDateOrNull(
            waterRescuerExpiration
          ),
          riverRescuer: riverRescuer,
          riverRescuerExpiration: convertStringToDateOrNull(
            riverRescuerExpiration
          ),
          medicalTraining: medicalTraining,
          medicalTrainingExpiration: convertStringToDateOrNull(
            medicalTrainingExpiration
          ),
          paramedicHelper: paramedicHelper,
          paramedicHelperExpiration: convertStringToDateOrNull(
            paramedicHelperExpiration
          ),
          paramedic: paramedic,
          paramedicExpiration: convertStringToDateOrNull(paramedicExpiration),
          paramedicAssistance: paramedicAssistance,
          paramedicAssistanceExpiration: convertStringToDateOrNull(
            paramedicAssistanceExpiration
          ),
          paramedicEmergency: paramedicEmergency,
          paramedicEmergencyExpiration: convertStringToDateOrNull(
            paramedicEmergencyExpiration
          ),
          physician: physician,
          physicianExpiration: convertStringToDateOrNull(physicianExpiration),
          physicianEmergency: physicianEmergency,
          physicianEmergencyExpiration: convertStringToDateOrNull(
            physicianEmergencyExpiration
          ),
          squadLeader: squadLeader,
          squadLeaderExpiration: convertStringToDateOrNull(
            squadLeaderExpiration
          ),
          groupLeader: groupLeader,
          groupLeaderExpiration: convertStringToDateOrNull(
            groupLeaderExpiration
          ),
          guardLeader: guardLeader,
          guardLeaderExpiration: convertStringToDateOrNull(
            guardLeaderExpiration
          ),
          trainLeader: trainLeader,
          trainLeaderExpiration: convertStringToDateOrNull(
            trainLeaderExpiration
          ),
          carDrivingLicense: carDrivingLicense,
          carDrivingLicenseExpiration: convertStringToDateOrNull(
            carDrivingLicenseExpiration
          ),
          blueLightInstruction: blueLightInstruction,
          blueLightInstructionExpiration: convertStringToDateOrNull(
            blueLightInstructionExpiration
          ),
          boatmanLake: boatmanLake,
          boatmanLakeExpiration: convertStringToDateOrNull(
            boatmanLakeExpiration
          ),
          boatmanInland: boatmanInland,
          boatmanInlandExpiration: convertStringToDateOrNull(
            boatmanInlandExpiration
          ),
          lifeboatOperator: lifeboatOperator,
          lifeboatOperatorExpiration: convertStringToDateOrNull(
            lifeboatOperatorExpiration
          ),
          rwcPilotStage: rwcPilotStage,
          rwcPilotStageExpiration: convertStringToDateOrNull(
            rwcPilotStageExpiration
          ),
          fasty: fasty,
          fastyExpiration: convertStringToDateOrNull(fastyExpiration),
          srcCertificate: srcCertificate,
          srcCertificateExpiration: convertStringToDateOrNull(
            srcCertificateExpiration
          ),
          bosCertificate: bosCertificate,
          bosCertificateExpiration: convertStringToDateOrNull(
            bosCertificateExpiration
          ),
          droneClass: droneClass,
          droneClassExpiration: convertStringToDateOrNull(droneClassExpiration),
          volunteerDataSheet: volunteerDataSheet,
          volunteerDataSheetExpiration: convertStringToDateOrNull(
            volunteerDataSheetExpiration
          ),
          youthLeaderCard: youthLeaderCard,
          youthLeaderCardExpiration: convertStringToDateOrNull(
            youthLeaderCardExpiration
          ),
          instructorSwimmer: instructorSwimmer,
          instructorSwimmerExpiration: convertStringToDateOrNull(
            instructorSwimmerExpiration
          ),
          lifeguardInstructor: lifeguardInstructor,
          lifeguardInstructorExpiration: convertStringToDateOrNull(
            lifeguardInstructorExpiration
          ),
          instructorWaterRescuer: instructorWaterRescuer,
          instructorWaterRescuerExpiration: convertStringToDateOrNull(
            instructorWaterRescuerExpiration
          ),
          instructorMedicalService: instructorMedicalService,
          instructorMedicalServiceExpiration: convertStringToDateOrNull(
            instructorMedicalServiceExpiration
          ),
          guardWalker: guardWalker,
          guardWalkerExpiration: convertStringToDateOrNull(
            guardWalkerExpiration
          ),
          boat: boat,
          boatExpiration: convertStringToDateOrNull(boatExpiration),
          car: car,
          carExpiration: convertStringToDateOrNull(carExpiration),
          rwc: rwc,
          rwcExpiration: convertStringToDateOrNull(rwcExpiration),
          guardLeaderInstruction: guardLeaderInstruction,
          guardLeaderInstructionExpiration: convertStringToDateOrNull(
            guardLeaderInstructionExpiration
          ),
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

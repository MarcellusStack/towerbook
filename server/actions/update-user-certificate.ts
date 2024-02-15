"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { userCertificateSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { convertStringToDateOrNull } from "@/utils";

export const updateUserCertificate = authAction("updateUser")(
  userCertificateSchema,
  async (
    {
      userId,
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
          id: userId,
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

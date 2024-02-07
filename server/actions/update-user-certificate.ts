"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { userCertificateSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";

export const updateUserCertificate = authAction("updateUser")(
  userCertificateSchema,
  async (
    {
      userId,
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
          id: userId,
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

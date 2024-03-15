"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { firstAidOperationSmallSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const updateFirstAidOperationSmall = authAction("updateProtocol")(
  firstAidOperationSmallSchema,
  async (
    {
      id,
      lastName,
      firstName,
      startTime,
      endTime,
      operationLocation,
      accidentTime,
      guardLeader,
      helper,
      emergencyEvent,
      sysBloodPressure,
      diaBloodPressure,
      oxygenSaturation,
      pulse,
      breahtingFrequency,
      bloodSugar,
      temperature,
      woundBandaged,
      splinterRemoved,
      tickPulled,
      plasterGlued,
      woundEducation,
      vaccinationStatus,
      rinseWoundWithWater,
      otherMeasure,
    },
    { session }
  ) => {
    try {
      const currentOperation = await prisma.firstAidOperation.findUnique({
        where: { id: id },
        include: {
          helper: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      if (!currentOperation) {
        throw new Error("Einsatz nicht gefunden");
      }

      const currentHelperIds = currentOperation.helper.map(
        (helper) => helper.id
      );
      const newHelperIds = helper.map((helper) => helper.id);

      const disconnectHelpers = currentHelperIds.filter(
        (helper) => !newHelperIds.includes(helper)
      );

      // Find helpers to connect (those in new helpers but not in current helpers)
      const connectHelpers = newHelperIds.filter(
        (helper) => !currentHelperIds.includes(helper)
      );
      await prisma.firstAidOperation.update({
        where: {
          organizationId: session.organizationId as string,
          id: id,
          status: { notIn: ["revision", "completed"] },
        },
        data: {
          status: "ongoing",
          lastName: lastName,
          firstName: firstName,
          startTime: extractTimeFromDate(startTime as string),
          endTime: extractTimeFromDate(endTime as string),
          operationLocation: operationLocation,
          accidentTime: extractTimeFromDate(accidentTime as string),
          guardLeader: { connect: { id: guardLeader.id } },
          helper: {
            connect: connectHelpers.map((id) => ({ id: id })),
            disconnect: disconnectHelpers.map((id) => ({ id: id })),
          },
          emergencyEvent: emergencyEvent,
          sysBloodPressure: parseInt(sysBloodPressure),
          diaBloodPressure: parseInt(diaBloodPressure),
          oxygenSaturation: parseInt(oxygenSaturation),
          pulse: parseInt(pulse),
          breahtingFrequency: parseInt(breahtingFrequency),
          bloodSugar: parseInt(bloodSugar),
          temperature: parseInt(temperature),
          woundBandaged: woundBandaged,
          splinterRemoved: splinterRemoved,
          tickPulled: tickPulled,
          plasterGlued: plasterGlued,
          woundEducation: woundEducation,
          vaccinationStatus: vaccinationStatus,
          rinseWoundWithWater: rinseWoundWithWater,
          otherMeasure: otherMeasure,
        },
      });
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Einsatzes");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Einsatz wurde aktualisiert`,
    };
  }
);

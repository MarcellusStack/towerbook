"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { firstAidOperationSmallSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const updateFirstAidOperationSmall = adminAction(
  firstAidOperationSmallSchema,
  async (
    {
      id,
      lastName,
      firstName,
      startTime,
      endTime,
      operationLocation,
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
          guardLeader: { connect: { id: guardLeader.id } },
          helper: helper,
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

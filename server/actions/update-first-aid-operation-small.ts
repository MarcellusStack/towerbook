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
    { user }
  ) => {
    try {
      await prisma.firstAidOperation.update({
        where: {
          organizationId: user.organizationId as string,
          id: id,
          status: { notIn: ["revision", "completed"] },
        },
        data: {
          status: "ongoing",
          lastName: lastName,
          firstName: firstName,
          startTime: extractTimeFromDate(startTime as string),
          endTime: extractTimeFromDate(endTime),
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
        select: { id: true },
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

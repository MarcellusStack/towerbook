"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { firstAidOperationBigSchema, searchListSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const updateFirstAidOperationBig = adminAction(
  firstAidOperationBigSchema,
  async (
    {
      id,
      healthInsurance,
      lastName,
      firstName,
      address,
      birthDate,
      cashRegisterNumber,
      insuranceNumber,
      operationNumberControlCenter,
      operationNumberWRD,
      startTime,
      endTime,
      operationLocation,
      guardLeader,
      helper,
      commissionedControlCenter,
      emergencyMedicalIntervention,
      transportAmbulance,
      alertBathers,
      alertPolice,
      alertOwnObservation,
      alertLeader,
      usedGuardLeader,
      usedLifeguard,
      usedRescueAssistant,
      usedGuardOperationManager,
      countForces,
      usedBoat,
      usedQuad,
      usedVehicle,
      usedJetSki,
      usedOtherResources,
      usedFireDepartment,
      usedRescueService,
      usedAirRescue,
      usedNeighboringWRD,
      usedPolice,
      usedDGzRS,
      usedDiver,
      usedOther,
      swimmingAccident,
      internalEmergency,
      surgicalEmergency,
      neurologicalEmergency,
      firstResponderOperation,
      otherAccident,
      asthma,
      aspiration,
      hyperventilation,
      heartAttack,
      rhythmDisorder,
      hypertensiveCrisis,
      shock,
      bloodSugarImbalance,
      drownAlmostDrown,
      allergicReaction,
      hypothermia,
      poisoning,
      seizure,
      acuteAbdomen,
      otherIllness,
      emergencyEvent,
      injurySkullBrainFace,
      injurySpine,
      injuryChest,
      injuryAbdomen,
      injuryPelvis,
      injuryExtremities,
      sysBloodPressure,
      diaBloodPressure,
      oxygenSaturation,
      pulse,
      breahtingFrequency,
      bloodSugar,
      temperature,
      consciousnessOriented,
      consciousnessClouded,
      consciousnessUnconscious,
      breathingSpontaneouslyFreely,
      breathingShortnessOfBreath,
      breathingRespiratoryArrest,
      circulationPulseRegularly,
      circulationPulseIrregularly,
      circulationCirculatoryArrest,
      hurtSlightly,
      hurtModerately,
      hurtSeverely,
      circulationIVAccess,
      circulationMedication,
      circulationResuscitation,
      circulationAED,
      circulationDefibrillation,
      breathingProvideOxygen,
      breathingMedication,
      breathingSuction,
      breathingIntubation,
      breathingVentilation,
      positionHigh,
      positionShock,
      positionStable,
      positionFlat,
      positionVacuumMattress,
      woundCare,
      sedation,
      cervicalCollar,
      cooling,
      heatPreservation,
      resultConditionImproved,
      resultConditionUnchanged,
      resultConditionDeteriorated,
      resultDeathAtLocation,
      handOverRTW,
      handOverNEF,
      handOverKTW,
      handOverRTH,
      firstResponderFirstName,
      firstResponderLastName,
      firstResponderAddress,
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
          healthInsurance: healthInsurance,
          lastName: lastName,
          firstName: firstName,
          address: address,
          birthDate: new Date(birthDate),
          cashRegisterNumber: cashRegisterNumber,
          insuranceNumber: insuranceNumber,
          operationNumberControlCenter: operationNumberControlCenter,
          operationNumberWRD: operationNumberWRD,
          startTime: extractTimeFromDate(startTime as string),
          endTime: extractTimeFromDate(endTime),
          operationLocation: operationLocation,
          guardLeader: { connect: { id: guardLeader.id } },
          helper: helper,
          commissionedControlCenter: commissionedControlCenter,
          emergencyMedicalIntervention: emergencyMedicalIntervention,
          transportAmbulance: transportAmbulance,
          alertBathers: alertBathers,
          alertPolice: alertPolice,
          alertOwnObservation: alertOwnObservation,
          alertLeader: alertLeader,
          usedGuardLeader: usedGuardLeader,
          usedLifeguard: usedLifeguard,
          usedRescueAssistant: usedRescueAssistant,
          usedGuardOperationManager: usedGuardOperationManager,
          countForces: parseInt(countForces),
          usedBoat: usedBoat,
          usedQuad: usedQuad,
          usedVehicle: usedVehicle,
          usedJetSki: usedJetSki,
          usedOtherResources: usedOtherResources,
          usedFireDepartment: usedFireDepartment,
          usedRescueService: usedRescueService,
          usedAirRescue: usedAirRescue,
          usedNeighboringWRD: usedNeighboringWRD,
          usedPolice: usedPolice,
          usedDGzRS: usedDGzRS,
          usedDiver: usedDiver,
          usedOther: usedOther,
          swimmingAccident: swimmingAccident,
          internalEmergency: internalEmergency,
          surgicalEmergency: surgicalEmergency,
          neurologicalEmergency: neurologicalEmergency,
          firstResponderOperation: firstResponderOperation,
          otherAccident: otherAccident,
          asthma: asthma,
          aspiration: aspiration,
          hyperventilation: hyperventilation,
          heartAttack: heartAttack,
          rhythmDisorder: rhythmDisorder,
          hypertensiveCrisis: hypertensiveCrisis,
          shock: shock,
          bloodSugarImbalance: bloodSugarImbalance,
          drownAlmostDrown: drownAlmostDrown,
          allergicReaction: allergicReaction,
          hypothermia: hypothermia,
          poisoning: poisoning,
          seizure: seizure,
          acuteAbdomen: acuteAbdomen,
          otherIllness: otherIllness,
          emergencyEvent: emergencyEvent,
          injurySkullBrainFace: injurySkullBrainFace,
          injurySpine: injurySpine,
          injuryChest: injuryChest,
          injuryAbdomen: injuryAbdomen,
          injuryPelvis: injuryPelvis,
          injuryExtremities: injuryExtremities,
          sysBloodPressure: parseInt(sysBloodPressure),
          diaBloodPressure: parseInt(diaBloodPressure),
          oxygenSaturation: parseInt(oxygenSaturation),
          pulse: parseInt(pulse),
          breahtingFrequency: parseInt(breahtingFrequency),
          bloodSugar: parseInt(bloodSugar),
          temperature: parseInt(temperature),
          consciousnessOriented: consciousnessOriented,
          consciousnessClouded: consciousnessClouded,
          consciousnessUnconscious: consciousnessUnconscious,
          breathingSpontaneouslyFreely: breathingSpontaneouslyFreely,
          breathingShortnessOfBreath: breathingShortnessOfBreath,
          breathingRespiratoryArrest: breathingRespiratoryArrest,
          circulationPulseRegularly: circulationPulseRegularly,
          circulationPulseIrregularly: circulationPulseIrregularly,
          circulationCirculatoryArrest: circulationCirculatoryArrest,
          hurtSlightly: hurtSlightly,
          hurtModerately: hurtModerately,
          hurtSeverely: hurtSeverely,
          circulationIVAccess: circulationIVAccess,
          circulationMedication: circulationMedication,
          circulationResuscitation: circulationResuscitation,
          circulationAED: circulationAED,
          circulationDefibrillation: circulationDefibrillation,
          breathingProvideOxygen: breathingProvideOxygen,
          breathingMedication: breathingMedication,
          breathingSuction: breathingSuction,
          breathingIntubation: breathingIntubation,
          breathingVentilation: breathingVentilation,
          positionHigh: positionHigh,
          positionShock: positionShock,
          positionStable: positionStable,
          positionFlat: positionFlat,
          positionVacuumMattress: positionVacuumMattress,
          woundCare: woundCare,
          sedation: sedation,
          cervicalCollar: cervicalCollar,
          cooling: cooling,
          heatPreservation: heatPreservation,
          resultConditionImproved: resultConditionImproved,
          resultConditionUnchanged: resultConditionUnchanged,
          resultConditionDeteriorated: resultConditionDeteriorated,
          resultDeathAtLocation: resultDeathAtLocation,
          handOverRTW: handOverRTW,
          handOverNEF: handOverNEF,
          handOverKTW: handOverKTW,
          handOverRTH: handOverRTH,
          firstResponderFirstName: firstResponderFirstName,
          firstResponderLastName: firstResponderLastName,
          firstResponderAddress: firstResponderAddress,
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

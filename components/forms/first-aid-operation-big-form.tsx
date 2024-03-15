"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Text,
  Checkbox,
  Box,
  Card,
  Textarea,
  Space,
  Avatar,
  ActionIcon,
} from "@mantine/core";
import { firstAidOperationBigSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { type FirstAidOperationProps } from "@/server/queries/get-first-aid-operation";
import { convertTime } from "@/utils";
import { UserSelect } from "@components/user-select";
import { UserComboboxButton } from "@components/user-combobox-button";
import { UserFormCard } from "../user-form-card";
import { InputCheck } from "@components/inputs/input-check";
import { updateFirstAidOperationBig } from "@server/actions/update-first-aid-operation-big";
import { Signature } from "@components/signature";
import { tableColumnProps } from "@/constants";
import { MantineTable } from "@components/mantine-table";
import { IconTrash } from "@tabler/icons-react";

export const FirstAidOperationBigForm = ({
  operation,
}: {
  operation: FirstAidOperationProps;
}) => {
  const form = useForm({
    name: "first-aid-operation-big-form",
    validate: zodResolver(firstAidOperationBigSchema),
    initialValues: {
      id: operation.id,
      healthInsurance: operation.healthInsurance,
      lastName: operation.lastName,
      firstName: operation.firstName,
      address: operation.address,
      birthDate: new Date(operation.birthDate),
      cashRegisterNumber: operation.cashRegisterNumber,
      insuranceNumber: operation.insuranceNumber,
      operationNumberControlCenter: operation.operationNumberControlCenter,
      operationNumberWRD: operation.operationNumberWRD,
      startTime: convertTime(new Date(operation.startTime)),
      endTime: convertTime(new Date(operation.endTime)),
      operationLocation: operation.operationLocation,
      guardLeader: operation.guardLeader,
      helper: operation.helper === null ? new Array() : operation.helper,
      signatureGuardLeader: operation.signatureGuardLeader || [],
      signatureFirstAider: operation.signatureFirstAider || [],
      signatureSecondAider: operation.signatureSecondAider || [],
      commissionedControlCenter: operation.commissionedControlCenter,
      emergencyMedicalIntervention: operation.emergencyMedicalIntervention,
      transportAmbulance: operation.transportAmbulance,
      alertBathers: operation.alertBathers,
      alertPolice: operation.alertPolice,
      alertOwnObservation: operation.alertOwnObservation,
      alertLeader: operation.alertLeader,
      usedGuardLeader: operation.usedGuardLeader,
      usedLifeguard: operation.usedLifeguard,
      usedRescueAssistant: operation.usedRescueAssistant,
      usedGuardOperationManager: operation.usedGuardOperationManager,
      countForces: operation.countForces.toString(),
      usedBoat: operation.usedBoat,
      usedQuad: operation.usedQuad,
      usedVehicle: operation.usedVehicle,
      usedJetSki: operation.usedJetSki,
      usedOtherResources:
        operation.usedOtherResources === null
          ? new Array()
          : operation.usedOtherResources,
      usedFireDepartment: operation.usedFireDepartment,
      usedRescueService: operation.usedRescueService,
      usedAirRescue: operation.usedAirRescue,
      usedNeighboringWRD: operation.usedNeighboringWRD,
      usedPolice: operation.usedPolice,
      usedDGzRS: operation.usedDGzRS,
      usedDiver: operation.usedDiver,
      usedOther:
        operation.usedOther === null ? new Array() : operation.usedOther,
      swimmingAccident: operation.swimmingAccident,
      internalEmergency: operation.internalEmergency,
      surgicalEmergency: operation.surgicalEmergency,
      neurologicalEmergency: operation.neurologicalEmergency,
      firstResponderOperation: operation.firstResponderOperation,
      otherAccident:
        operation.otherAccident === null
          ? new Array()
          : operation.otherAccident,
      asthma: operation.asthma,
      aspiration: operation.aspiration,
      hyperventilation: operation.hyperventilation,
      heartAttack: operation.heartAttack,
      rhythmDisorder: operation.rhythmDisorder,
      hypertensiveCrisis: operation.hypertensiveCrisis,
      shock: operation.shock,
      bloodSugarImbalance: operation.bloodSugarImbalance,
      drownAlmostDrown: operation.drownAlmostDrown,
      allergicReaction: operation.allergicReaction,
      hypothermia: operation.hypothermia,
      poisoning: operation.poisoning,
      seizure: operation.seizure,
      acuteAbdomen: operation.acuteAbdomen,
      otherIllness:
        operation.otherIllness === null ? new Array() : operation.otherIllness,
      emergencyEvent: operation.emergencyEvent,
      injurySkullBrainFace: operation.injurySkullBrainFace,
      injurySpine: operation.injurySpine,
      injuryChest: operation.injuryChest,
      injuryAbdomen: operation.injuryAbdomen,
      injuryPelvis: operation.injuryPelvis,
      injuryExtremities: operation.injuryExtremities,
      sysBloodPressure:
        operation.sysBloodPressure === null
          ? operation.sysBloodPressure
          : operation.sysBloodPressure.toString(),
      diaBloodPressure:
        operation.diaBloodPressure === null
          ? operation.diaBloodPressure
          : operation.diaBloodPressure.toString(),
      oxygenSaturation:
        operation.oxygenSaturation === null
          ? operation.oxygenSaturation
          : operation.oxygenSaturation.toString(),
      pulse:
        operation.pulse === null ? operation.pulse : operation.pulse.toString(),
      breahtingFrequency:
        operation.breahtingFrequency === null
          ? operation.breahtingFrequency
          : operation.breahtingFrequency.toString(),
      bloodSugar:
        operation.bloodSugar === null
          ? operation.bloodSugar
          : operation.bloodSugar.toString(),
      temperature:
        operation.temperature === null
          ? operation.temperature
          : operation.temperature.toString(),
      consciousnessOriented: operation.consciousnessOriented,
      consciousnessClouded: operation.consciousnessClouded,
      consciousnessUnconscious: operation.consciousnessUnconscious,
      breathingSpontaneouslyFreely: operation.breathingSpontaneouslyFreely,
      breathingShortnessOfBreath: operation.breathingShortnessOfBreath,
      breathingRespiratoryArrest: operation.breathingRespiratoryArrest,
      circulationPulseRegularly: operation.circulationPulseRegularly,
      circulationPulseIrregularly: operation.circulationPulseIrregularly,
      circulationCirculatoryArrest: operation.circulationCirculatoryArrest,
      hurtSlightly: operation.hurtSlightly,
      hurtModerately: operation.hurtModerately,
      hurtSeverely: operation.hurtSeverely,
      circulationIVAccess: operation.circulationIVAccess,
      circulationMedication: operation.circulationMedication,
      circulationResuscitation: operation.circulationResuscitation,
      circulationAED: operation.circulationAED,
      circulationDefibrillation: operation.circulationDefibrillation,
      breathingProvideOxygen: operation.breathingProvideOxygen,
      breathingMedication: operation.breathingMedication,
      breathingSuction: operation.breathingSuction,
      breathingIntubation: operation.breathingIntubation,
      breathingVentilation: operation.breathingVentilation,
      positionHigh: operation.positionHigh,
      positionShock: operation.positionShock,
      positionStable: operation.positionStable,
      positionFlat: operation.positionFlat,
      positionVacuumMattress: operation.positionVacuumMattress,
      woundCare: operation.woundCare,
      sedation: operation.sedation,
      cervicalCollar: operation.cervicalCollar,
      cooling: operation.cooling,
      heatPreservation: operation.heatPreservation,
      resultConditionImproved: operation.resultConditionImproved,
      resultConditionUnchanged: operation.resultConditionUnchanged,
      resultConditionDeteriorated: operation.resultConditionDeteriorated,
      resultDeathAtLocation: operation.resultDeathAtLocation,
      handOverRTW: operation.handOverRTW,
      handOverNEF: operation.handOverNEF,
      handOverKTW: operation.handOverKTW,
      handOverRTH: operation.handOverRTH,
      firstResponderFirstName: operation.firstResponderFirstName,
      firstResponderLastName: operation.firstResponderLastName,
      firstResponderAddress: operation.firstResponderAddress,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateFirstAidOperationBig,
    executeNotification: `Einsatz wird aktualisiert`,
  });
  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="md">
        <Fieldset
          id="patient"
          legend={
            <Text fw={700} size="xl">
              Patient
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput
              label="Krankenkasse"
              {...form.getInputProps("healthInsurance")}
            />
            <TextInput label="Nachname" {...form.getInputProps("lastName")} />
            <TextInput label="Vorname" {...form.getInputProps("firstName")} />
            <TextInput label="Anschrift" {...form.getInputProps("address")} />
            <DatePickerInput
              locale="de"
              label="Geburtsdatum"
              valueFormat="DD.MM.YYYY"
              {...form.getInputProps("birthDate")}
            />
            <TextInput
              label="Kassennummer"
              {...form.getInputProps("cashRegisterNumber")}
            />
            <TextInput
              label="Versichertennummer"
              {...form.getInputProps("insuranceNumber")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="operation-infos"
          legend={
            <Text fw={700} size="xl">
              Einsatz Informationen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput
              label="Einsatz-Nr. Leitstelle"
              {...form.getInputProps("operationNumberControlCenter")}
            />
            <TextInput
              label="Einsatz-Nr. WRD"
              {...form.getInputProps("operationNumberWRD")}
            />
            <TimeInput label="Beginn" {...form.getInputProps("startTime")} />
            <TimeInput label="Ende" {...form.getInputProps("endTime")} />
            <TextInput
              label="Einsatzort"
              {...form.getInputProps("operationLocation")}
            />
            <UserSelect
              formActionId="first-aid-operation-big-form"
              formField="guardLeader"
              label="Wachleiter"
              initialValue={`${operation.guardLeader.firstName} ${operation.guardLeader.lastName}`}
            />
          </SimpleGrid>
          <Space h="sm" />
          <Stack gap="sm">
            <Signature
              formActionId="first-aid-operation-big-form"
              formField="signatureGuardLeader"
              label="Unterschrift Wachleiter"
              initialValue={operation.signatureGuardLeader}
            />
            <UserComboboxButton
              label="Helfer"
              formActionId="first-aid-operation-big-form"
              formField="helper"
            />
            <MantineTable
              records={form.values.helper || []}
              columns={[
                {
                  accessor: "user",
                  title: "Benutzer",
                  render: ({ firstName, lastName }) => (
                    <>
                      <Avatar color="blue" radius="xl">
                        {firstName?.charAt(0)}
                        {lastName?.charAt(0)}
                      </Avatar>
                    </>
                  ),
                  ...tableColumnProps,
                },
                {
                  accessor: "name",
                  title: "name",
                  render: ({ firstName, lastName }) =>
                    `${firstName} ${lastName}`,
                  ...tableColumnProps,
                },
                {
                  accessor: "actions",
                  title: "Aktionen",
                  width: "0%",
                  render: ({}, index) => (
                    <ActionIcon
                      onClick={() => {
                        form.removeListItem("helper", index);
                      }}
                      variant="subtle"
                      color="red"
                    >
                      <IconTrash
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  ),
                  ...tableColumnProps,
                },
              ]}
              storeKey="first-aid-operation-big-helper-table"
            />
            <Signature
              formActionId="first-aid-operation-big-form"
              formField="signatureFirstAider"
              label="Unterschrift Helfer 1"
              initialValue={operation.signatureFirstAider}
            />
            <Signature
              formActionId="first-aid-operation-big-form"
              formField="signatureSecondAider"
              label="Unterschrift Helfer 2"
              initialValue={operation.signatureSecondAider}
            />
          </Stack>
        </Fieldset>
        <Fieldset
          id="insert-your-title-here"
          legend={
            <Text fw={700} size="xl">
              [Insert your title here]
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Beauftragung durch Leitstelle"
              {...form.getInputProps("commissionedControlCenter", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Notarzteinsatz"
              {...form.getInputProps("emergencyMedicalIntervention", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Abtransport durch Rettungsdienst"
              {...form.getInputProps("transportAmbulance", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="alarm"
          legend={
            <Text fw={700} size="xl">
              Alarmierung durch
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Badegäste"
              {...form.getInputProps("alertBathers", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Polizei / Wasserschutzzpolizei"
              {...form.getInputProps("alertPolice", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="eigene Beobachtung"
              {...form.getInputProps("alertOwnObservation", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wach- / Einsatzleiter WRD"
              {...form.getInputProps("alertLeader", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="forces-deployed"
          legend={
            <Text fw={700} size="xl">
              Eingesetzte Kräfte
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Wachleiter"
              {...form.getInputProps("usedGuardLeader", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Rettungsschwimmer"
              {...form.getInputProps("usedLifeguard", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="RettAss / NS"
              {...form.getInputProps("usedRescueAssistant", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wach- / Einsatzleiter WRD"
              {...form.getInputProps("usedGuardOperationManager", {
                type: "checkbox",
              })}
            />
            <TextInput
              type="number"
              label="Gesamtzahl Einsatzkräfte"
              {...form.getInputProps("countForces")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="rescue-equipment-used"
          legend={
            <Text fw={700} size="xl">
              Eingesetzte Rettungsmittel
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Boot"
              {...form.getInputProps("usedBoat", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Quad"
              {...form.getInputProps("usedQuad", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="KFZ"
              {...form.getInputProps("usedVehicle", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Jetski"
              {...form.getInputProps("usedJetSki", {
                type: "checkbox",
              })}
            />
            <Box />
            <Box />
            <InputCheck
              formName="first-aid-operation-big-form"
              formField="usedOtherResources"
              fieldName="Sonstige"
              form={form}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="additional-emergency-services"
          legend={
            <Text fw={700} size="xl">
              weitere Einsatzkräfte
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Feuerwehr"
              {...form.getInputProps("usedFireDepartment", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Rettungsdienst"
              {...form.getInputProps("usedRescueService", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Luftrettung"
              {...form.getInputProps("usedAirRescue", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="benachbarter WRD"
              {...form.getInputProps("usedNeighboringWRD", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wasserschutzpolizei / Polizei"
              {...form.getInputProps("usedPolice", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="DGzRS"
              {...form.getInputProps("usedDGzRS", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Taucher"
              {...form.getInputProps("usedDiver", {
                type: "checkbox",
              })}
            />
            <Box />
            <Box />
            <InputCheck
              formName="first-aid-operation-big-form"
              formField="usedOther"
              fieldName="Sonstige"
              form={form}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="type-of-use"
          legend={
            <Text fw={700} size="xl">
              Einsatzart
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Badeunfall"
              {...form.getInputProps("swimmingAccident", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Internistischer Notfall"
              {...form.getInputProps("internalEmergency", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Chirurgischer Notfall"
              {...form.getInputProps("surgicalEmergency", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Neurologischer Notfall"
              {...form.getInputProps("neurologicalEmergency", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="First Responder-Einsatz"
              {...form.getInputProps("firstResponderOperation", {
                type: "checkbox",
              })}
            />
            <Box />
            <InputCheck
              formName="first-aid-operation-big-form"
              formField="otherAccident"
              fieldName="Sonstige"
              form={form}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="diseases"
          legend={
            <Text fw={700} size="xl">
              Erkrankungen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Atmung
              </Text>
              <Checkbox
                label="Asthma"
                {...form.getInputProps("asthma", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Aspiration"
                {...form.getInputProps("aspiration", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Hyperventilation"
                {...form.getInputProps("hyperventilation", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Kreislauf
              </Text>
              <Checkbox
                label="Herzinfarkt"
                {...form.getInputProps("heartAttack", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Rhythmusstörung"
                {...form.getInputProps("rhythmDisorder", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="hypertensive Krise"
                {...form.getInputProps("hypertensiveCrisis", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Schock"
                {...form.getInputProps("shock", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Sonstiges
              </Text>
              <Checkbox
                label="Blutzuckerentgleisung"
                {...form.getInputProps("bloodSugarImbalance", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Ertrinken / Beinahe-Ertrinken"
                {...form.getInputProps("drownAlmostDrown", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Allergische Reaktion"
                {...form.getInputProps("allergicReaction", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Unterkühlung"
                {...form.getInputProps("hypothermia", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Checkbox
                label="Vergiftung"
                {...form.getInputProps("poisoning", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Krampfanfall"
                {...form.getInputProps("seizure", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="akuter Bauch"
                {...form.getInputProps("acuteAbdomen", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Unterkühlung"
                {...form.getInputProps("hypothermia", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Box />
            <Box />
            <InputCheck
              formName="first-aid-operation-big-form"
              formField="otherIllness"
              fieldName="Sonstige"
              form={form}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="emergency-event"
          legend={
            <Text fw={700} size="xl">
              Notfallgeschehen
            </Text>
          }
        >
          <Textarea
            rows={6}
            label="Notfallgeschehen"
            {...form.getInputProps("emergencyEvent")}
          />
        </Fieldset>
        <Fieldset
          id="diseases"
          legend={
            <Text fw={700} size="xl">
              Verletzungen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Schädel - Hirn / Gesicht"
              {...form.getInputProps("injurySkullBrainFace", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wirbelsäule"
              {...form.getInputProps("injurySpine", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Brustkorb"
              {...form.getInputProps("injuryChest", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Bauch"
              {...form.getInputProps("injuryAbdomen", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Becken"
              {...form.getInputProps("injuryPelvis", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Extremitäten"
              {...form.getInputProps("injuryExtremities", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="measurements"
          legend={
            <Text fw={700} size="xl">
              Messwerte
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput
              type="number"
              label="Systolisch Blutdruck mmHg"
              {...form.getInputProps("sysBloodPressure")}
            />
            <TextInput
              type="number"
              label="Diastolisch Blutdruck mmHg"
              {...form.getInputProps("diaBloodPressure")}
            />
            <TextInput
              type="number"
              label="SpO² %"
              {...form.getInputProps("oxygenSaturation")}
            />
            <TextInput
              type="number"
              label="Puls / min"
              {...form.getInputProps("pulse")}
            />
            <TextInput
              type="number"
              label="Atemfrequenz / min"
              {...form.getInputProps("breahtingFrequency")}
            />
            <TextInput
              type="number"
              label="Blutzucker mg/dl"
              {...form.getInputProps("bloodSugar")}
            />
            <TextInput
              type="number"
              label="Temperatur °C"
              {...form.getInputProps("temperature")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="conciousness"
          legend={
            <Text fw={700} size="xl">
              Bewusstsein
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="orientiert"
              {...form.getInputProps("consciousnessOriented", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="getrübt"
              {...form.getInputProps("consciousnessClouded", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="bewusstlos"
              {...form.getInputProps("consciousnessUnconscious", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="breathing"
          legend={
            <Text fw={700} size="xl">
              Atmung
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="spontan / frei"
              {...form.getInputProps("breathingSpontaneouslyFreely", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Atemnot"
              {...form.getInputProps("breathingShortnessOfBreath", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Atemstillstand"
              {...form.getInputProps("breathingRespiratoryArrest", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="circuit"
          legend={
            <Text fw={700} size="xl">
              Kreislauf
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Puls regelmäßig"
              {...form.getInputProps("circulationPulseRegularly", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Puls unregelemäßig"
              {...form.getInputProps("circulationPulseIrregularly", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Kreislaufstillstand"
              {...form.getInputProps("circulationCirculatoryArrest", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="pain"
          legend={
            <Text fw={700} size="xl">
              Schmerzen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="leicht"
              {...form.getInputProps("hurtSlightly", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="mittel"
              {...form.getInputProps("hurtModerately", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="stark"
              {...form.getInputProps("hurtSeverely", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="measures"
          legend={
            <Text fw={700} size="xl">
              Maßnahmen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Herz / Kreislauf
              </Text>
              <Checkbox
                label="i.V.-Zugang"
                {...form.getInputProps("circulationIVAccess", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Medikamente"
                {...form.getInputProps("circulationMedication", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Reanimation"
                {...form.getInputProps("circulationResuscitation", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="AED"
                {...form.getInputProps("circulationAED", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Defibrillation"
                {...form.getInputProps("circulationDefibrillation", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Atmung
              </Text>
              <Checkbox
                label="Sauerstoffgabe"
                {...form.getInputProps("breathingProvideOxygen", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Medikamente"
                {...form.getInputProps("breathingMedication", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Absaugung"
                {...form.getInputProps("breathingSuction", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Intubation"
                {...form.getInputProps("breathingIntubation", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Beatmung"
                {...form.getInputProps("breathingVentilation", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Lagerung
              </Text>
              <Checkbox
                label="OK-Hochlage"
                {...form.getInputProps("positionHigh", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Schocklage"
                {...form.getInputProps("positionShock", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="stabile Seitenlage"
                {...form.getInputProps("positionStable", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Flachlagerung"
                {...form.getInputProps("positionFlat", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Vakuummatratze"
                {...form.getInputProps("positionVacuumMattress", {
                  type: "checkbox",
                })}
              />
            </Stack>
            <Stack gap="sm">
              <Text fw={700} size="lg">
                Sonstiges
              </Text>
              <Checkbox
                label="Wundversorgung"
                {...form.getInputProps("woundCare", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Ruhigstellung"
                {...form.getInputProps("sedation", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="HWS-Kragen"
                {...form.getInputProps("cervicalCollar", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Kühlung"
                {...form.getInputProps("cooling", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                label="Wärmeerhaltung"
                {...form.getInputProps("heatPreservation", {
                  type: "checkbox",
                })}
              />
            </Stack>
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="result"
          legend={
            <Text fw={700} size="xl">
              Ergebnis
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Zustand verbessert"
              {...form.getInputProps("resultConditionImproved", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Zustand gleich"
              {...form.getInputProps("resultConditionUnchanged", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Zustand verschlechtert"
              {...form.getInputProps("resultConditionDeteriorated", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Tod am Notfallort"
              {...form.getInputProps("resultDeathAtLocation", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="handover-to"
          legend={
            <Text fw={700} size="xl">
              Übergabe an
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="RTW"
              {...form.getInputProps("handOverRTW", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="NEF"
              {...form.getInputProps("handOverNEF", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="KTW"
              {...form.getInputProps("handOverKTW", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="RTH"
              {...form.getInputProps("handOverRTH", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="first-responder-witness"
          legend={
            <Text fw={700} size="xl">
              Ersthelfer / Zeuge
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput
              label="Name"
              {...form.getInputProps("firstResponderFirstName")}
            />
            <TextInput
              label="Vorname"
              {...form.getInputProps("firstResponderLastName")}
            />
            <TextInput
              label="Anschrift"
              {...form.getInputProps("firstResponderAddress")}
            />
          </SimpleGrid>
        </Fieldset>
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          <Button
            variant="filled"
            loading={status === "executing"}
            type="submit"
            className="self-start"
          >
            Speichern
          </Button>
        </Card>
      </Stack>
    </form>
  );
};

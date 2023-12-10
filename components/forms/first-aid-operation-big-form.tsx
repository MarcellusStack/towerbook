"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  FileInput,
  Select,
  Text,
  NumberInput,
  Checkbox,
  Box,
} from "@mantine/core";
import { userProfileSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type Profile } from "@prisma/client";
import { type ExtendFirstAidOperationWithRelationProps } from "@/server/queries/get-first-aid-operation";
import { convertTime, extractTimeFromDate } from "@/utils";
import { UserSelect } from "@components/user-select";
import { UserComboboxButton } from "@components/user-combobox-button";
import { UserFormCard } from "../user-form-card";

export const FirstAidOperationBigForm = ({
  operation,
}: {
  operation: ExtendFirstAidOperationWithRelationProps;
}) => {
  const form = useForm({
    name: "first-aid-operation-big-form",
    /* validate: zodResolver(userProfileSchema), */
    initialValues: {
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
      commissionedControlCenter: operation.commissionedControlCenter,
      emergencyMedicalIntervention: operation.emergencyMedicalIntervention,
      transportAmbulance: operation.transportAmbulance,
      alertBathers: operation.alertBathers,
      alertPolice: operation.alertPolice,
    },
  });

  console.log(form.values);

  const { execute, result, status } = useActionNotification({
    action: updateUserProfile,
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
              Einsatz Info´s
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
            <UserComboboxButton
              label="Helfer"
              formActionId="first-aid-operation-big-form"
              formField="helper"
            />
            <Box />
            <Box />
            {form.values.helper.map((helper, index) => (
              <UserFormCard
                props={helper}
                index={index}
                formField="helper"
                formActionId="first-aid-operation-big-form"
              />
            ))}
          </SimpleGrid>
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
          </SimpleGrid>
        </Fieldset>
        <Button
          loading={status === "executing"}
          type="submit"
          className="self-start"
        >
          Speichern
        </Button>
      </Stack>
    </form>
  );
};

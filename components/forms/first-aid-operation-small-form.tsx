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
  Card,
  Group,
  ActionIcon,
  Divider,
  Textarea,
} from "@mantine/core";
import {
  firstAidOperationBigSchema,
  firstAidOperationSmallSchema,
  userProfileSchema,
} from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type Profile } from "@prisma/client";
import { type ExtendFirstAidOperationWithRelationProps } from "@/server/queries/get-first-aid-operation";
import { convertTime, extractTimeFromDate } from "@/utils";
import { UserSelect } from "@components/user-select";
import { UserComboboxButton } from "@components/user-combobox-button";
import { UserFormCard } from "../user-form-card";
import { IconTrash } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { InputCheck } from "@components/inputs/input-check";
import { updateFirstAidOperationBig } from "@server/actions/update-first-aid-operation-big";
import { updateFirstAidOperationSmall } from "@server/actions/update-first-aid-operation-small";

export const FirstAidOperationSmallForm = ({
  operation,
}: {
  operation: ExtendFirstAidOperationWithRelationProps;
}) => {
  const form = useForm({
    name: "first-aid-operation-small-form",
    validate: zodResolver(firstAidOperationSmallSchema),
    initialValues: {
      id: operation.id,
      lastName: operation.lastName,
      firstName: operation.firstName,
      startTime: convertTime(new Date(operation.startTime)),
      endTime: convertTime(new Date(operation.endTime)),
      operationLocation: operation.operationLocation,
      guardLeader: operation.guardLeader,
      helper: operation.helper === null ? new Array() : operation.helper,
      emergencyEvent: operation.emergencyEvent,
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
      woundBandaged: operation.woundBandaged,
      splinterRemoved: operation.splinterRemoved,
      tickPulled: operation.tickPulled,
      plasterGlued: operation.plasterGlued,
      woundEducation: operation.woundEducation,
      vaccinationStatus: operation.vaccinationStatus,
      rinseWoundWithWater: operation.rinseWoundWithWater,
      otherMeasure:
        operation.otherMeasure === null ? new Array() : operation.otherMeasure,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateFirstAidOperationSmall,
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
            <TextInput label="Nachname" {...form.getInputProps("lastName")} />
            <TextInput label="Vorname" {...form.getInputProps("firstName")} />
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
            <TimeInput label="Beginn" {...form.getInputProps("startTime")} />
            <TimeInput label="Ende" {...form.getInputProps("endTime")} />
            <TextInput
              label="Unfallort"
              {...form.getInputProps("operationLocation")}
            />
            <UserSelect
              formActionId="first-aid-operation-small-form"
              formField="guardLeader"
              label="Wachleiter"
              initialValue={`${operation.guardLeader.firstName} ${operation.guardLeader.lastName}`}
            />
            <Box />
            <Box />
            <UserComboboxButton
              label="Helfer"
              formActionId="first-aid-operation-small-form"
              formField="helper"
            />
            <Box />
            <Box />

            {form.values.helper.map((helper, index) => (
              <UserFormCard
                props={helper}
                index={index}
                formField="helper"
                formActionId="first-aid-operation-small-form"
              />
            ))}
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="emergency-event"
          legend={
            <Text fw={700} size="xl">
              Hergang des Unfalls
            </Text>
          }
        >
          <Textarea
            rows={6}
            label="Hergang des Unfalls"
            {...form.getInputProps("emergencyEvent")}
          />
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
          id="measures"
          legend={
            <Text fw={700} size="xl">
              Maßnahmen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Checkbox
              label="Wunde verbunden"
              {...form.getInputProps("woundBandaged", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Splitter entfernt"
              {...form.getInputProps("splinterRemoved", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Zecke gezogen"
              {...form.getInputProps("tickPulled", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Pflaster geklebt"
              {...form.getInputProps("plasterGlued", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wundaufklärung"
              {...form.getInputProps("woundEducation", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Inf.-status Tetanus Status abgefragt und aufgeklärt"
              {...form.getInputProps("vaccinationStatus", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Wunde mit Wasser abgespült"
              {...form.getInputProps("rinseWoundWithWater", {
                type: "checkbox",
              })}
            />

            <Box />
            <Box />
            <InputCheck
              formName="first-aid-operation-small-form"
              formField="otherMeasure"
              fieldName="Sonstige"
              form={form}
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

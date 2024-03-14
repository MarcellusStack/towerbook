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
  ActionIcon,
  Avatar,
  Space,
} from "@mantine/core";
import { firstAidOperationSmallSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { TimeInput } from "@mantine/dates";
import { convertTime } from "@/utils";
import { UserSelect } from "@components/user-select";
import { UserComboboxButton } from "@components/user-combobox-button";
import { InputCheck } from "@components/inputs/input-check";
import { updateFirstAidOperationSmall } from "@server/actions/update-first-aid-operation-small";
import { FirstAidOperationProps } from "@/server/queries/get-first-aid-operation";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { IconTrash } from "@tabler/icons-react";

export const FirstAidOperationSmallForm = ({
  operation,
}: {
  operation: FirstAidOperationProps;
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
      accidentTime: convertTime(new Date(operation.accidentTime)),
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
            <TimeInput
              label="Unfallzeit"
              {...form.getInputProps("accidentTime")}
            />
            <UserSelect
              formActionId="first-aid-operation-small-form"
              formField="guardLeader"
              label="Wachleiter"
              initialValue={`${operation.guardLeader.firstName} ${operation.guardLeader.lastName}`}
            />
          </SimpleGrid>
          <Space h="sm" />
          <Stack gap="sm">
            <UserComboboxButton
              label="Helfer"
              formActionId="first-aid-operation-small-form"
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
              storeKey="first-aid-operation-small-helper-table"
            />
          </Stack>
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
              label="Splitter selbständig entfernt"
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

"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Text, rem, SegmentedControl } from "@mantine/core";
import { updateFirstAidOperationSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { IconAmbulance, IconFirstAidKit } from "@tabler/icons-react";
import { UserSelect } from "@/components/user-select";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { convertTime } from "@/utils";
import { TowerFirstAidOperationProps } from "@/server/queries/get-tower-first-aid-operations";
import { updateTowerFirstAidOperation } from "@towers/[id]/first-aid-operation/_actions";

export const UpdateTowerFirstAidOperationForm = ({
  operation,
}: {
  operation: TowerFirstAidOperationProps;
}) => {
  const form = useForm({
    name: "update-tower-first-aid-operation-form",
    validate: zodResolver(updateFirstAidOperationSchema),
    initialValues: {
      id: operation.id,
      type: operation.type,
      date: new Date(operation.date),
      startTime: convertTime(new Date(operation.startTime)),
      guardLeader: operation.guardLeader,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateTowerFirstAidOperation,
    executeNotification: "Einsatz wird aktualisiert",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <SegmentedControl
          mt="md"
          fullWidth
          color="blue"
          {...form.getInputProps("type")}
          data={[
            {
              label: (
                <Stack gap={0} align="center">
                  <IconFirstAidKit
                    style={{ width: rem(30), height: rem(30) }}
                  />

                  <Text size="lg">Einsatz klein</Text>
                </Stack>
              ),
              value: "small",
            },
            {
              label: (
                <Stack gap={0} align="center">
                  <IconAmbulance style={{ width: rem(30), height: rem(30) }} />
                  <Text size="lg">Einsatz groß</Text>
                </Stack>
              ),
              value: "big",
            },
          ]}
        />
        {form.errors.type && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen Sie ein Typ hinzu
          </Text>
        )}
        <DatePickerInput
          clearable
          locale="de"
          label="Datum"
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("date")}
        />
        <TimeInput label="Uhrzeit" {...form.getInputProps("startTime")} />
        <UserSelect
          formActionId="update-tower-first-aid-operation-form"
          formField="guardLeader"
          label="Wachleiter"
          initialValue={operation.guardLeader.id}
        />
        {form.errors.guardLeader && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen Sie ein Wachleiter hinzu
          </Text>
        )}
        <Button loading={status === "executing"} type="submit">
          Aktualisieren
        </Button>
      </Stack>
    </form>
  );
};

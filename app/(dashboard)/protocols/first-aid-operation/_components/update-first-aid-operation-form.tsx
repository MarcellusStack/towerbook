"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Text, rem, SegmentedControl } from "@mantine/core";
import { updateFirstAidOperationSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { IconAmbulance, IconFirstAidKit } from "@tabler/icons-react";
import { FirstAidOperationProps } from "@/server/queries/get-first-aid-operations";
import { TowerSelect } from "@/components/tower-select";
import { UserSelect } from "@/components/user-select";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { convertTime } from "@/utils";
import { updateFirstAidOperation } from "@first-aid-operation/_actions";

export const UpdateFirstAidOperationForm = ({
  operation,
}: {
  operation: FirstAidOperationProps;
}) => {
  const form = useForm({
    name: "update-first-aid-operation-form",
    validate: zodResolver(updateFirstAidOperationSchema),
    initialValues: {
      id: operation.id,
      type: operation.type,
      date: new Date(operation.date),
      startTime: convertTime(new Date(operation.startTime)),
      guardLeader: operation.guardLeader,
      towerId: operation.tower.id,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateFirstAidOperation,
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
          formActionId="update-first-aid-operation-form"
          formField="guardLeader"
          label="Wachleiter"
          initialValue={operation.guardLeader.id}
        />
        {form.errors.guardLeader && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen Sie ein Wachleiter hinzu
          </Text>
        )}
        <TowerSelect
          formActionId="update-first-aid-operation-form"
          formField="towerId"
          label="Turm"
          initialValue={operation.tower.id}
        />
        {form.errors.towerId && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen Sie ein Turm hinzu
          </Text>
        )}
        <Button loading={status === "executing"} type="submit">
          Aktualisieren
        </Button>
      </Stack>
    </form>
  );
};

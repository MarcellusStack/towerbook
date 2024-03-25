"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, SegmentedControl, Text, rem } from "@mantine/core";
import { createFirstAidOperationSchema } from "@/schemas";
import { TowerSelect } from "@components/tower-select";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { convertTime } from "@/utils";
import { IconAmbulance, IconFirstAidKit } from "@tabler/icons-react";
import { createFirstAidOperation } from "@server/actions/create-first-aid-operation";
import { GuardLeaderSelect } from "@components/guard-leader-select";

export const CreateFirstAidOperationForm = () => {
  const form = useForm({
    name: "create-first-aid-operation-form",
    validate: zodResolver(createFirstAidOperationSchema),
    initialValues: {
      type: "",
      date: new Date(),
      startTime: convertTime(new Date()),
      guardLeader: "",
      towerId: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createFirstAidOperation,
    executeNotification: "Einsatz wird erstellt",
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
            Bitte fügen sie ein Typ hinzu.
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
        <GuardLeaderSelect
          formActionId="create-first-aid-operation-form"
          formField="guardLeader"
          label="Wachleiter"
        />
        {form.errors.guardLeader && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen sie ein Wachleiter hinzu.
          </Text>
        )}
        <TowerSelect
          formActionId="create-first-aid-operation-form"
          formField="towerId"
          label="Turm"
        />
        {form.errors.towerId && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen sie ein Turm hinzu.
          </Text>
        )}
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

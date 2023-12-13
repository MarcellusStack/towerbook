"use client";
import React from "react";

import { useForm, zodResolver } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Stack,
  Select,
  SegmentedControl,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  createFirstAidOperationSchema,
  createSearchListSchema,
  createUserSchema,
} from "@/schemas";
import { roles } from "@constants/roles";
import { TowerSelect } from "@components/tower-select";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { createSearchList } from "@/server/actions/create-search-list";
import { convertTime } from "@/utils";
import { UserSelect } from "@components/user-select";
import { IconAmbulance, IconFirstAidKit } from "@tabler/icons-react";
import { createFirstAidOperation } from "@server/actions/create-first-aid-operation";
import { useParams } from "next/navigation";

export const CreateTowerFirstAidOperationForm = () => {
  const { id } = useParams();
  const form = useForm({
    name: "create-tower-first-aid-operation-form",
    validate: zodResolver(createFirstAidOperationSchema),
    initialValues: {
      type: "",
      date: new Date(),
      startTime: convertTime(new Date()),
      guardLeader: "",
      towerId: id,
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
        <UserSelect
          formActionId="create-tower-first-aid-operation-form"
          formField="guardLeader"
          label="Wachleiter"
        />
        {form.errors.guardLeader && (
          <Text size="xs" c="red" mt="-xs">
            Bitte fügen sie ein Wachleiter hinzu.
          </Text>
        )}

        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

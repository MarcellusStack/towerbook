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
  Group,
  Card,
  rem,
  ActionIcon,
  Box,
  Textarea,
} from "@mantine/core";
import { towerDayIncidentSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type TowerDay } from "@prisma/client";
import { IconShieldLock, IconTrash } from "@tabler/icons-react";
import { UserComboboxButton } from "@components/user-combobox-button";
import { modals } from "@mantine/modals";
import { UserSelect } from "@components/user-select";
import { updateTowerDayWatchmanPlan } from "@/server/actions/update-tower-day-watchman-plan";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { TowerDayTodoProps } from "@/server/queries/get-tower-day-todo";
import { TowerDayIncidentProps } from "@/server/queries/get-tower-day-incident";
import { updateTowerDayIncident } from "@/server/actions/update-tower-day-incident";

export const TowerDayIncidentForm = ({
  towerday,
}: {
  towerday: TowerDayIncidentProps;
}) => {
  const form = useForm({
    name: "tower-day-todo-form",
    validate: zodResolver(towerDayIncidentSchema),
    initialValues: {
      id: towerday.id,
      incident: towerday.incident,
    },
  });

  console.log(towerday);

  const update = useActionNotification({
    action: updateTowerDayIncident,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Vorkommnisse
            </Text>
          }
        >
          <Stack gap="md">
            <Textarea
              placeholder="Vorkommnisse"
              autosize
              minRows={10}
              {...form.getInputProps("incident")}
            />
            <TowerDayFormAction
              updateStatus={update.status === "executing"}
              form="incidentStatus"
            />
          </Stack>
        </Fieldset>
      </Stack>
    </form>
  );
};

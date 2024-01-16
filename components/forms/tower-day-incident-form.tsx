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
import { v4 as uuidv4 } from "uuid";

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
      incident: towerday.incident === null ? new Array() : towerday.incident,
    },
  });

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
          <Button
            variant="outline"
            mb="md"
            onClick={() => {
              form.insertListItem("incident", {
                id: uuidv4(),
                event: "",
                description: "",
              });
            }}
          >
            Hinzufügen
          </Button>
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            {form.values.incident &&
              form.values.incident.map((incident, index) => (
                <Card key={incident.id} withBorder p="sm">
                  <Stack gap="md">
                    <TextInput
                      placeholder="Ereignis"
                      {...form.getInputProps(`incident.${index}.event`)}
                    />
                    <Textarea
                      placeholder="Beschreibung"
                      autosize
                      minRows={10}
                      {...form.getInputProps(`incident.${index}.description`)}
                    />
                  </Stack>
                </Card>
              ))}
          </SimpleGrid>
        </Fieldset>
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="incidentStatus"
          />
        </Card>
      </Stack>
    </form>
  );
};

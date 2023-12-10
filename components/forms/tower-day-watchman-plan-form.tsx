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
  Group,
  Card,
  rem,
  ActionIcon,
  Box,
  Avatar,
} from "@mantine/core";
import { towerDayWatchmanPlanSchema } from "@/schemas";
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

export const TowerDayWatchmanPlanForm = ({
  towerday,
}: {
  towerday: TowerDay;
}) => {
  const form = useForm({
    name: "tower-day-watchman-plan-form",
    validate: zodResolver(towerDayWatchmanPlanSchema),
    initialValues: {
      id: towerday.id,
      guardLeader: towerday.guardLeader.id,
      towerLeader: towerday.towerLeader.id,
      watchman: towerday.watchman === null ? new Array() : towerday.watchman,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayWatchmanPlan,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Wachplan
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <UserSelect
              formActionId="tower-day-watchman-plan-form"
              formField="guardLeader"
              label="Wachleiter"
              initialValue={`${towerday.guardLeader.firstName} ${towerday.guardLeader.lastName}`}
            />
            <UserSelect
              formActionId="tower-day-watchman-plan-form"
              formField="towerLeader"
              label="Turmleiter"
              initialValue={`${towerday.towerLeader.firstName} ${towerday.towerLeader.lastName}`}
            />
            <Box />
            <UserComboboxButton
              label="Wachgänger"
              formActionId="tower-day-watchman-plan-form"
              formField="watchman"
            />
            <Box />
            <Box />

            {form.values.watchman.map((watchman, index) => (
              <Card key={`${watchman.id}-${index}`} padding="xs" withBorder>
                <Group justify="space-between">
                  <Avatar color="blue" radius="xl">
                    {watchman.firstName?.charAt(0)}
                    {watchman.lastName?.charAt(0)}
                  </Avatar>
                  <Group gap={rem(4)}>
                    <Text>{watchman.firstName}</Text>
                    <Text>{watchman.lastName}</Text>
                  </Group>
                  <ActionIcon
                    onClick={() => {
                      form.removeListItem("watchman", index);
                    }}
                    variant="subtle"
                    color="red"
                  >
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="watchmanStatus"
          />
        </Fieldset>
      </Stack>
    </form>
  );
};

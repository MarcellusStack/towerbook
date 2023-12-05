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
import {
  searchListSchema,
  towerDayTodoSchema,
  towerDayWatchmanPlanSchema,
} from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type TowerDay } from "@prisma/client";
import { IconShieldLock, IconTrash, IconUserCheck } from "@tabler/icons-react";
import { UserComboboxButton } from "@components/user-combobox-button";
import { modals } from "@mantine/modals";
import { UserSelect } from "@components/user-select";
import { updateTowerDayWatchmanPlan } from "@/server/actions/update-tower-day-watchman-plan";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { TowerDayTodoProps } from "@/server/queries/get-tower-day-todo";
import type { ExtendSearchListWithTowerProps } from "@/server/queries/get-search-list";
import { updateSearchList } from "@server/actions/update-search-list";
import { completeSearchList } from "@/server/actions/complete-search-list";
import { convertTime, extractTimeFromDate } from "@/utils";

export const SearchListForm = ({
  searchlist,
}: {
  searchlist: ExtendSearchListWithTowerProps;
}) => {
  const form = useForm({
    name: "search-list-form",
    validate: zodResolver(searchListSchema),
    initialValues: {
      id: searchlist.id,
      description: searchlist.description,
      timeFound:
        searchlist.timeFound === null
          ? searchlist.timeFound
          : convertTime(searchlist.timeFound),

      handOverTo: searchlist.handOverTo,
    },
  });

  const update = useActionNotification({
    action: updateSearchList,
    executeNotification: `Sucheintrag wird aktualisiert`,
  });

  const complete = useActionNotification({
    action: completeSearchList,
    executeNotification: `Sucheintrag wird abgeschlossen`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Sucheintrag
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TimeInput
              label="Uhrzeit gefunden"
              {...form.getInputProps("timeFound")}
            />
            <TextInput
              label="Übergeben an"
              {...form.getInputProps("handOverTo")}
            />
            <Box />
            <Textarea
              rows={6}
              
              label="Beschreibung"
              {...form.getInputProps("description")}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xs">
            <Button
              variant="filled"
              type="submit"
              loading={update.status === "executing"}
            >
              Speichern
            </Button>
            
          </Group>
        </Fieldset>
      </Stack>
    </form>
  );
};

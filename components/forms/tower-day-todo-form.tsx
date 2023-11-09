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
} from "@mantine/core";
import { towerDayTodoSchema, towerDayWatchmanPlanSchema } from "@/schemas";
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

export const TowerDayTodoForm = ({
  towerday,
}: {
  towerday: TowerDayTodoProps;
}) => {
  const form = useForm({
    name: "tower-day-todo-form",
    validate: zodResolver(towerDayTodoSchema),
    initialValues: {
      id: towerday.id,
      todo: towerday.todo === null ? new Array() : towerday.todo,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayTodo,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Todo
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Button
              variant="outline"
              onClick={() => {
                form.insertListItem("todo", {
                  id: `${Math.floor(Math.random() * 1000000)}`,
                  todo: "",
                  checked: false,
                });
              }}
            >
              Todo hinzufügen
            </Button>
            <Box />
            <Box />
            {form.values.todo &&
              form.values.todo.map((todo, index) => (
                <Card key={`${todo.id}-${index}`} padding={rem(4)} withBorder>
                  <Group justify="space-between">
                    <Checkbox
                      label="Erledigt"
                      {...form.getInputProps(`todo.${index}.checked`, {
                        type: "checkbox",
                      })}
                    />
                    <TextInput
                      placeholder="Todo"
                      {...form.getInputProps(`todo.${index}.todo`)}
                    />
                    <ActionIcon
                      onClick={() => {
                        form.removeListItem("todo", index);
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
            form="todoStatus"
          />
        </Fieldset>
      </Stack>
    </form>
  );
};

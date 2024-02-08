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
import { towerDayTodoSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { IconTrash } from "@tabler/icons-react";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { type TowerdayTodoProps } from "@/server/queries/get-tower-day-todo";
import { v4 as uuidv4 } from "uuid";

export const TowerdayTodoForm = ({
  towerday,
}: {
  towerday: TowerdayTodoProps;
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
          <Stack gap="sm">
            <SimpleGrid
              cols={{ base: 2, xl: 3 }}
              spacing="sm"
              verticalSpacing="sm"
            >
              {form.values.todo &&
                form.values.todo.map((todo, index) => (
                  <Card key={`${todo.id}-${index}`} padding="sm" withBorder>
                    <Group justify="space-between">
                      <TextInput
                        placeholder="Todo"
                        {...form.getInputProps(`todo.${index}.todo`)}
                      />
                      <Checkbox
                        color="green"
                        label="Erledigt"
                        {...form.getInputProps(`todo.${index}.checked`, {
                          type: "checkbox",
                        })}
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
            <Button
              className="self-start"
              variant="outline"
              onClick={() => {
                form.insertListItem("todo", {
                  id: uuidv4(),
                  todo: "",
                  checked: false,
                });
              }}
            >
              Todo hinzufügen
            </Button>
          </Stack>
        </Fieldset>
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="todoStatus"
          />
        </Card>
      </Stack>
    </form>
  );
};

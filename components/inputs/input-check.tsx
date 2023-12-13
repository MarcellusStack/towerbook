"use client";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType, createFormActions } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export type Field = {
  id: string;
  input: string;
  checked: boolean;
};

export const InputCheck = ({
  formName,
  formField,
  fieldName,
  form,
}: {
  formName: string;
  formField: string;
  fieldName: string;
  form: any;
}) => {
  const formAction = createFormActions(formName);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          formAction.insertListItem(formField, {
            id: uuidv4(),
            resource: "",
            checked: false,
          });
        }}
      >
        {fieldName} hinzufügen
      </Button>
      <Box />
      <Box />
      {form.values[formField] &&
        form.values[formField].map((field: Field, index: number) => (
          <Card key={`${field.id}-${index}`} padding="sm" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Group>
                <Checkbox
                  color="green"
                  {...form.getInputProps(`${formField}.${index}.checked`, {
                    type: "checkbox",
                  })}
                />
                <TextInput
                  {...form.getInputProps(`${formField}.${index}.input`)}
                />
              </Group>

              <ActionIcon
                onClick={() => {
                  formAction.removeListItem(formField, index);
                }}
                variant="subtle"
                color="red"
              >
                <IconTrash
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Card>
        ))}
    </>
  );
};

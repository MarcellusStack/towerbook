"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  SegmentedControl,
  Text,
  Checkbox,
} from "@mantine/core";
import { createPermissionSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import Image from "next/image";
import { createTower } from "@/server/actions/create-tower";

export const CreatePermissionForm = () => {
  const form = useForm({
    validate: zodResolver(createPermissionSchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createPermission,
    executeNotification: "Berechtigung wird erstellt",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <TextInput label="Name" {...form.getInputProps("name")} />
        <TextInput
          label="Beschreibung"
          {...form.getInputProps("description")}
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

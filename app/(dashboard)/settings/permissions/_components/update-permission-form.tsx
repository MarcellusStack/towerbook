"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { updatePermissionSchemaForm } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { PermissionsProps, updatePermission } from "@permissions/_actions";

export const UpdatePermissionForm = ({
  permission,
}: {
  permission: PermissionsProps[0];
}) => {
  const form = useForm({
    validate: zodResolver(updatePermissionSchemaForm),
    initialValues: {
      id: permission.id,
      name: permission.name,
      description: permission.description,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updatePermission,
    executeNotification: "Berechtigung wird aktualisiert",
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
          Aktualisieren
        </Button>
      </Stack>
    </form>
  );
};

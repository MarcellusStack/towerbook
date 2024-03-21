"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { inviteUserSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { inviteUser } from "@/server/actions/invite-user";
import { PermissionSelect } from "@components/permission-select";

export const InviteUserForm = () => {
  const form = useForm({
    name: "invite-user-form",
    validate: zodResolver(inviteUserSchema),
    initialValues: {
      email: "",
      permissionId: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: inviteUser,
    executeNotification: "Benutzer wird eingeladen",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <TextInput
          label="E-Mail"
          type="email"
          {...form.getInputProps("email")}
        />
        <PermissionSelect
          formActionId="invite-user-form"
          formField="permissionId"
          label="Berechtigung"
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

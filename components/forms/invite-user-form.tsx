"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Select } from "@mantine/core";
import { inviteUserSchema } from "@/schemas";
import { roles } from "@constants/roles";
import { useActionNotification } from "@hooks/use-action-notification";
import { inviteUser } from "@/server/actions/invite-user";

export const InviteUserForm = () => {
  const form = useForm({
    validate: zodResolver(inviteUserSchema),
    initialValues: {
      email: "",
      role: "",
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
        <Select
          label="Rolle"
          placeholder="Rolle auswählen"
          data={roles}
          searchable
          nothingFoundMessage="Keine Ergebnisse gefunden"
          {...form.getInputProps("role")}
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack, PasswordInput } from "@mantine/core";
import { createUserSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { PermissionSelect } from "@components/permission-select";
import { DateInput } from "@mantine/dates";
import { createUser } from "@users/_actions";

export const CreateUserForm = () => {
  const form = useForm({
    name: "create-user-form",
    validate: zodResolver(createUserSchema),
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      birthDate: new Date(),
      permissionId: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createUser,
    executeNotification: "Benutzer wird erstellt",
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
        <PasswordInput label="Passwort" {...form.getInputProps("password")} />
        <TextInput label="Vorname" {...form.getInputProps("firstName")} />
        <TextInput label="Nachname" {...form.getInputProps("lastName")} />
        <DateInput
          locale="de"
          label="Geburtsdatum"
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("birthDate")}
        />
        <PermissionSelect
          formActionId="create-user-form"
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

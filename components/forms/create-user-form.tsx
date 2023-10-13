"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Select } from "@mantine/core";
import { createUserSchema } from "@/schemas";
import { roles } from "@constants/roles";
import { useActionNotification } from "@hooks/use-action-notification";
import { createUser } from "@server/actions/create-user";

export const CreateUserForm = () => {
  const form = useForm({
    validate: zodResolver(createUserSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
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
          label="Vorname"
          type="firstName"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Name"
          type="lastName"
          {...form.getInputProps("lastName")}
        />
        <TextInput
          label="E-Mail"
          type="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput label="Password" {...form.getInputProps("password")} />
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

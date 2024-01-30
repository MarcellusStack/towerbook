"use client";

import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { onboardingSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput } from "@mantine/dates";
import { createUser } from "@/app/(authentication)/onboarding/_actions";

export const Onboarding = () => {
  const form = useForm({
    validate: zodResolver(onboardingSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: new Date(),
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createUser,
    executeNotification: "Onboarding wird durchgeführt",
    redirectUrl: "/organization",
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <TextInput label="Vorname" {...form.getInputProps("firstName")} />
        <TextInput label="Nachname" {...form.getInputProps("lastName")} />
        <DatePickerInput
          locale="de"
          label="Geburtsdatum"
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("birthDate")}
        />
        <Button variant="filled" loading={status === "executing"} type="submit">
          Anmelden
        </Button>
      </Stack>
    </form>
  );
};

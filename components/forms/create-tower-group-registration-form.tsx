"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { createGroupRegistrationSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { createGroupRegistration } from "@server/actions/create-group-registration";
import { useParams } from "next/navigation";

export const CreateTowerGroupRegistrationForm = () => {
  const { id } = useParams();
  const form = useForm({
    name: "create-group-registration-form",
    validate: zodResolver(createGroupRegistrationSchema),
    initialValues: {
      date: new Date(),
      time: "",
      name: "",
      count: "",
      supervisorFirstName: "",
      supervisorLastName: "",
      towerId: id,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createGroupRegistration,
    executeNotification: "Gruppe wird erstellt",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <DatePickerInput
          clearable
          locale="de"
          label="Datum"
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("date")}
        />
        <TimeInput label="Uhrzeit" {...form.getInputProps("time")} />
        <TextInput label="Gruppenname" {...form.getInputProps("name")} />
        <TextInput
          type="number"
          label="Anzahl"
          {...form.getInputProps("count")}
        />
        <TextInput
          label="Betreuer Vorname"
          {...form.getInputProps("supervisorFirstName")}
        />
        <TextInput
          label="Betreuer Nachname"
          {...form.getInputProps("supervisorLastName")}
        />

        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

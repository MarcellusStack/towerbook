"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { createSearchListSchema } from "@/schemas";
import { TowerSelect } from "@components/tower-select";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { createSearchList } from "@/server/actions/create-search-list";

export const CreateSearchListForm = () => {
  const form = useForm({
    name: "create-search-list-form",
    validate: zodResolver(createSearchListSchema),
    initialValues: {
      date: new Date(),
      timeSearched: "",
      firstName: "",
      lastName: "",
      description: "",
      towerId: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createSearchList,
    executeNotification: "Sucheintrag wird erstellt",
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
        <TimeInput label="Uhrzeit" {...form.getInputProps("timeSearched")} />
        <TextInput label="Vorname" {...form.getInputProps("firstName")} />
        <TextInput label="Nachname" {...form.getInputProps("lastName")} />
        <TowerSelect
          formActionId="create-search-list-form"
          formField="towerId"
          label="Turm"
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

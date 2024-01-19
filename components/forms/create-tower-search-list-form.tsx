"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { createSearchListSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { createSearchList } from "@/server/actions/create-search-list";
import { useParams } from "next/navigation";

export const CreateTowerSearchListForm = () => {
  const { id } = useParams();
  const form = useForm({
    name: "create-search-list-form",
    validate: zodResolver(createSearchListSchema),
    initialValues: {
      date: new Date(),
      timeSearched: "",
      firstName: "",
      lastName: "",
      towerId: id,
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

        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

"use client";

import React from "react";
import { createFormActions, useForm, zodResolver } from "@mantine/form";
import { Modal, Button, TextInput, Text, Stack, Select } from "@mantine/core";
import * as z from "zod";
import { shiftSchema } from "@schemas/index";
import { UserSelect } from "@components/user-select";
import { useActionNotification } from "@hooks/use-action-notification";
import { createOrg } from "@/server/actions/create-organization";
import { shiftTypes } from "@/constants/shift-types";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { v4 as uuidv4 } from "uuid";

export const CreateShiftForm = ({ date }: { date?: Date }) => {
  const formAction = createFormActions("tower-day-duty-plan-form");
  const form = useForm({
    name: "create-shift-form",
    validate: zodResolver(shiftSchema),
    initialValues: {
      id: uuidv4(),
      startTime: date ? date : new Date(),
      endTime: date ? new Date(date.getTime() + 60 * 60 * 1000) : new Date(),
      type: "",
      user: {
        id: "",
        userId: "",
        firstName: "",
        lastName: "",
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        formAction.insertListItem("shifts", values);
        modals.closeAll();
      })}
    >
      <Stack gap="sm">
        <Text c="dimmed" size="sm" mt="sm">
          Erstellen Sie hier eine Schicht für Ihren Dienstplan. Klicken Sie auf
          'Erstellen', wenn Sie fertig sind.
        </Text>
        <DateTimePicker
          label="Von Datum und Uhrzeit"
          defaultValue={new Date()}
          locale="de"
          valueFormat="DD.MM.YYYY HH:mm"
          {...form.getInputProps("startTime")}
        />
        <DateTimePicker
          label="Bis Datum und Uhrzeit"
          defaultValue={new Date()}
          locale="de"
          valueFormat="DD.MM.YYYY HH:mm"
          {...form.getInputProps("endTime")}
        />
        <Select
          label="Schicht Typ"
          data={shiftTypes}
          {...form.getInputProps("type")}
        />
        <UserSelect
          formActionId="create-shift-form"
          formField="user"
          label="Benutzer"
          initialValue={null}
        />

        <Button type="submit">Erstellen</Button>
      </Stack>
    </form>
  );
};

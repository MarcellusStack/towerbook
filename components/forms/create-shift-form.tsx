"use client";

import React from "react";
import { createFormActions, useForm, zodResolver } from "@mantine/form";
import { Button, Text, Stack, Select } from "@mantine/core";
import { shiftSchema } from "@schemas/index";
import { UserSelect } from "@components/user-select";
import { shiftTypes } from "@/constants/shift-types";
import { DateTimePicker, TimeInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { v4 as uuidv4 } from "uuid";
import { ShiftType } from "@prisma/client";
import { convertTime } from "@/utils";

export const CreateShiftForm = ({
  time,
  shiftType,
}: {
  time?: string; // Change the type of time to string
  shiftType?: ShiftType;
}) => {
  const formAction = createFormActions("tower-day-duty-plan-form");

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const startTime = time
    ? time
    : convertTime(
        new Date(currentTime.setHours(currentHour, currentMinute, 0))
      );

  const endTime = time
    ? convertTime(
        new Date(
          currentTime.setHours(
            Number(time.split(":")[0]) + 1,
            Number(time.split(":")[1]),
            0
          )
        )
      )
    : convertTime(
        new Date(currentTime.setHours(currentHour + 1, currentMinute, 0))
      );

  const form = useForm({
    name: "create-shift-form",
    validate: zodResolver(shiftSchema),
    initialValues: {
      id: uuidv4(),
      startTime,
      endTime,
      type: shiftType || "",
      user: {
        id: "",
        firstName: "",
        lastName: "",
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const startTime = new Date();
        const [startHours, startMinutes] = values.startTime
          .split(":")
          .map(Number);
        startTime.setHours(startHours, startMinutes);

        const endTime = new Date();
        const [endHours, endMinutes] = values.endTime.split(":").map(Number);
        endTime.setHours(endHours, endMinutes);

        const updatedValues = {
          ...values,
          startTime,
          endTime,
        };

        formAction.insertListItem("shifts", updatedValues);
        modals.closeAll();
      })}
    >
      <Stack gap="sm">
        <Text c="dimmed" size="sm" mt="sm">
          Erstellen Sie hier eine Schicht für Ihren Dienstplan. Klicken Sie auf
          'Erstellen', wenn Sie fertig sind.
        </Text>
        <TimeInput label="Von Uhrzeit" {...form.getInputProps("startTime")} />
        <TimeInput label="Bis Uhrzeit" {...form.getInputProps("endTime")} />
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

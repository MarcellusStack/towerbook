"use client";

import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Select } from "@mantine/core";
import { createTowerDaySchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useParams } from "next/navigation";
import { createTowerDay } from "@/server/actions/create-tower-day";
import { UserTasksProps } from "@/server/queries/get-users-for-tasks";
import { UserSelect } from "@components/user-select";

export const CreateTowerDayForm = () => {
  const { id } = useParams();
  const form = useForm({
    name: "create-tower-day-form",
    validate: zodResolver(createTowerDaySchema),
    initialValues: {
      createdAt: new Date(),
      startedAt: "",
      guardLeader: "",
      towerLeader: "",
      towerId: id,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createTowerDay,
    executeNotification: "Turm Tag wird erstellt",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md" mt="md">
        <DatePickerInput
          clearable
          locale="de"
          label="Datum"
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("createdAt")}
        />
        <TimeInput label="Uhrzeit" {...form.getInputProps("startedAt")} />
        <UserSelect
          formActionId="create-tower-day-form"
          formField="guardLeader"
          label="Wachleiter"
          initialValue={null}
        />
        <UserSelect
          formActionId="create-tower-day-form"
          formField="towerLeader"
          label="Turmleiter"
          initialValue={null}
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

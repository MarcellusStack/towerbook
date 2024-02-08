"use client";

import { useForm, zodResolver } from "@mantine/form";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { createTowerDaySchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput } from "@mantine/dates";
import { useParams } from "next/navigation";
import { createTowerDay } from "@/server/actions/create-tower-day";
import { UserSelect } from "@components/user-select";

export const CreateTowerDayForm = () => {
  const { id } = useParams();
  const form = useForm({
    name: "create-tower-day-form",
    validate: zodResolver(createTowerDaySchema),
    initialValues: {
      createdAt: new Date(),
      startedAt: "",
      guardLeader: { id: "", firstName: "", lastName: "" },
      towerLeader: { id: "", firstName: "", lastName: "" },
      towerId: id,
      addTodo: true,
      addMaterial: true,
      addWeather: true,
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
        <Group>
          <Checkbox
            label="Todos"
            {...form.getInputProps("addTodo", { type: "checkbox" })}
          />
          <Checkbox
            label="Material"
            {...form.getInputProps("addMaterial", { type: "checkbox" })}
          />
          <Checkbox
            label="Wetter"
            {...form.getInputProps("addWeather", { type: "checkbox" })}
          />
        </Group>
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

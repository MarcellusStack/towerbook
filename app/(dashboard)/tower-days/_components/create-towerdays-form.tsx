"use client";

import { useForm, zodResolver } from "@mantine/form";
import {
  ActionIcon,
  Button,
  Card,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { createTowerDaySchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { DatePickerInput } from "@mantine/dates";
import { createTowerDay } from "@/server/actions/create-tower-day";
import { UserSelect } from "@components/user-select";
import { TowerComboboxButton } from "@towerdays/_components/towerdays-combobox-button";
import { IconTrash } from "@tabler/icons-react";

export const CreateTowerDaysForm = () => {
  const form = useForm({
    name: "create-towerdays-form",
    /* validate: zodResolver(createTowerDaySchema), */
    initialValues: {
      createdAt: new Date(),
      guardLeader: { id: "", firstName: "", lastName: "" },
      towerdays: [],
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createTowerDay,
    executeNotification: "Turm Tage werden erstellt",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        /* execute(values); */
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
          formActionId="create-towerdays-form"
          formField="guardLeader"
          label="Wachleiter"
          initialValue={null}
        />
        <TowerComboboxButton
          formActionId="create-towerdays-form"
          formField="towerdays"
          label="Türme"
        />
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          {form.values.towerdays.map((towerday, index) => (
            <Card key={towerday.id} padding="xs" withBorder>
              <Stack gap="xs">
                <Text>
                  {towerday.tower.name} {towerday.tower.number}
                </Text>
                <UserSelect
                  formActionId="create-towerdays-form"
                  formField={`towerdays.${index}.towerLeader`}
                  label="Turmleiter"
                  initialValue={null}
                />
                <ActionIcon
                  className="self-end"
                  onClick={() => {
                    form.removeListItem("towerdays", index);
                  }}
                  variant="subtle"
                  color="red"
                >
                  <IconTrash style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

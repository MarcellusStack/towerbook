"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Text,
  Checkbox,
  Group,
  Card,
  rem,
  ActionIcon,
  Box,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import {
  searchListSchema,
  towerDayTodoSchema,
  towerDayWatchmanPlanSchema,
} from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type TowerDay } from "@prisma/client";
import { IconShieldLock, IconTrash, IconUserCheck } from "@tabler/icons-react";
import { UserComboboxButton } from "@components/user-combobox-button";
import { modals } from "@mantine/modals";
import { UserSelect } from "@components/user-select";
import { updateTowerDayWatchmanPlan } from "@/server/actions/update-tower-day-watchman-plan";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { TowerDayTodoProps } from "@/server/queries/get-tower-day-todo";
import type { ExtendSearchListWithTowerProps } from "@/server/queries/get-search-list";
import { updateSearchList } from "@server/actions/update-search-list";
import { completeSearchList } from "@/server/actions/complete-search-list";
import { convertTime, extractTimeFromDate } from "@/utils";

export const SearchListForm = ({
  searchlist,
}: {
  searchlist: ExtendSearchListWithTowerProps;
}) => {
  const form = useForm({
    name: "search-list-form",
    validate: zodResolver(searchListSchema),
    initialValues: {
      id: searchlist.id,
      description: searchlist.description,
      timeFound:
        searchlist.timeFound === null
          ? searchlist.timeFound
          : convertTime(searchlist.timeFound),

      handOverTo: searchlist.handOverTo,
    },
  });

  const update = useActionNotification({
    action: updateSearchList,
    executeNotification: `Sucheintrag wird aktualisiert`,
  });

  const complete = useActionNotification({
    action: completeSearchList,
    executeNotification: `Sucheintrag wird abgeschlossen`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Gesuchte Person
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput label="Vorname" {...form.getInputProps("firstName")} />
            <TextInput label="Nachname" {...form.getInputProps("lastName")} />
            <TextInput
              label="Alter"
              {...form.getInputProps("age")}
              type="number"
            />
            <TextInput label="Statur" {...form.getInputProps("stature")} />
            <TextInput
              label="Größe"
              {...form.getInputProps("height")}
              type="number"
            />
            <TextInput label="Kleidung" {...form.getInputProps("clothing")} />
            <Checkbox
              label="Vorerkrankung"
              {...form.getInputProps("previousIllness", {
                type: "checkbox",
              })}
            />
            <Textarea
              rows={6}
              label="Sonstige"
              {...form.getInputProps("description")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Meldende Person
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TextInput
              label="Vorname"
              {...form.getInputProps("firstNameReportingPerson")}
            />
            <TextInput
              label="Nachname"
              {...form.getInputProps("lastNameReportingPerson")}
            />
            <TextInput
              label="Alter"
              {...form.getInputProps("phoneReportingPerson")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Zuletzt gesehen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TimeInput label="Wann" {...form.getInputProps("lastSeen")} />
            <TextInput label="Wo" {...form.getInputProps("lastLocation")} />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Maßnahmen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <MultiSelect
              label="Mitteilung Türme"
              data={["Turm 1", "Turm 2", "Turm 3"]}
            />
            <MultiSelect
              label="Badeverbot"
              data={["Turm 1", "Turm 2", "Turm 3"]}
            />
            <TextInput label="Information Polizei" />
            <TextInput label="Information Feuerwehr" />
            <TextInput label="Information Strandvogt" />
            <TextInput label="Kettentauchen" />
            <TextInput label="Suche Quad" />
            <TextInput label="Strandstreife" />
            <TextInput label="Suche mit Boot" />
            <TextInput label="Suche mit Drohne" />
            <TextInput label="Suche RWC" />
            <TextInput label="Unterstützung anderer Strandabschnitt" />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Ergebnis
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <TimeInput
              label="Uhrzeit gefunden"
              {...form.getInputProps("timeFound")}
            />
            <TextInput
              label="Übergeben an"
              {...form.getInputProps("handOverTo")}
            />
            <Box />
          </SimpleGrid>
        </Fieldset>
        <Group justify="flex-end" mt="xs">
          <Button
            variant="filled"
            type="submit"
            loading={update.status === "executing"}
          >
            Speichern
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

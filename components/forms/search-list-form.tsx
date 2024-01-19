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
  Card,
  Box,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { searchListSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { TimeInput } from "@mantine/dates";
import { UserSelect } from "@components/user-select";
import type { ExtendSearchListWithTowerProps } from "@/server/queries/get-search-list";
import { updateSearchList } from "@server/actions/update-search-list";
import { completeSearchList } from "@/server/actions/complete-search-list";
import { convertTime } from "@/utils";

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
      lifeguard: searchlist.lifeguard,
      tower: searchlist.tower,
      firstName: searchlist.firstName,
      lastName: searchlist.lastName,
      age: searchlist.age,
      stature: searchlist.stature,
      height: searchlist.height,
      clothing: searchlist.clothing,
      previousIllness: searchlist.previousIllness,
      firstNameReportingPerson: searchlist.firstNameReportingPerson,
      lastNameReportingPerson: searchlist.lastNameReportingPerson,
      phoneReportingPerson: searchlist.phoneReportingPerson,
      description: searchlist.description,
      lastSeen: convertTime(new Date(searchlist.lastSeen)),
      lastLocation: searchlist.lastLocation,
      informationPolice: searchlist.informationPolice,
      informationFireDepartment: searchlist.informationFireDepartment,
      informationBeachVogt: searchlist.informationBeachVogt,
      chainDiving: searchlist.chainDiving,
      searchQuad: searchlist.searchQuad,
      beachPatrol: searchlist.beachPatrol,
      searchByBoat: searchlist.searchByBoat,
      searchByDrone: searchlist.searchByDrone,
      searchRWC: searchlist.searchRWC,
      supportOtherBeachArea: searchlist.supportOtherBeachArea,
      timeFound: convertTime(new Date(searchlist.timeFound)),

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
          id="wanted-person"
          legend={
            <Text fw={700} size="xl">
              [Insert your Title]
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <UserSelect
              formActionId="search-list-form"
              formField="lifeguard"
              label="Rettungsschwimmer"
              initialValue={`${searchlist.lifeguard.firstName} ${searchlist.lifeguard.lastName}`}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="wanted-person"
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
            <Textarea
              rows={6}
              label="Sonstige"
              {...form.getInputProps("description")}
            />
            <Checkbox
              label="Vorerkrankung"
              {...form.getInputProps("previousIllness", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="reporting-person"
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
              type="number"
              label="Alter"
              {...form.getInputProps("phoneReportingPerson")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="last-seen"
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
            <Textarea
              label="Information Polizei"
              {...form.getInputProps("informationPolice")}
            />
            <Textarea
              label="Information Feuerwehr"
              {...form.getInputProps("informationFireDepartment")}
            />
            <Textarea
              label="Information Strandvogt"
              {...form.getInputProps("informationBeachVogt")}
            />
            <Textarea
              label="Kettentauchen"
              {...form.getInputProps("chainDiving")}
            />
            <Textarea
              label="Suche Quad"
              {...form.getInputProps("searchQuad")}
            />
            <Textarea
              label="Strandstreife"
              {...form.getInputProps("beachPatrol")}
            />
            <TextInput
              label="Suche mit Boot"
              {...form.getInputProps("searchByBoat")}
            />
            <Textarea
              label="Suche mit Drohne"
              {...form.getInputProps("searchByDrone")}
            />
            <Textarea label="Suche RWC" {...form.getInputProps("searchRWC")} />
            <Textarea
              label="Unterstützung anderer Strandabschnitt"
              {...form.getInputProps("supportOtherBeachArea")}
            />
          </SimpleGrid>
        </Fieldset>
        <Fieldset
          id="result"
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
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          <Button
            variant="filled"
            type="submit"
            loading={update.status === "executing"}
            className="self-start"
          >
            Speichern
          </Button>
        </Card>
      </Stack>
    </form>
  );
};

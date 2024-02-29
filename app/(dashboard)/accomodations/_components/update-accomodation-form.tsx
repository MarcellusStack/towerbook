"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Text,
  Slider,
  ThemeIcon,
  Group,
  rem,
} from "@mantine/core";
import { updateAccomodationSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { updateAccomodation } from "@accomodations/_actions";
import { IconBed } from "@tabler/icons-react";
import { LocationSelect } from "@/components/location-select";
import { AccomodationsProps } from "@accomodations/_actions";

export const UpdateAccomodationForm = ({
  accomodation,
}: {
  accomodation: AccomodationsProps[0];
}) => {
  const form = useForm({
    name: "update-accomodation-form",
    validate: zodResolver(updateAccomodationSchema),
    initialValues: {
      id: accomodation.id,
      number: accomodation.number,
      name: accomodation.name,
      street: accomodation.street,
      zipCode: accomodation.zipCode,
      location: accomodation.location,
      availableBeds: accomodation.availableBeds,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateAccomodation,
    executeNotification: "Unterkunft wird aktualisiert",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <TextInput
          type="number"
          label="Nummer"
          {...form.getInputProps("number")}
        />
        <TextInput label="Name" {...form.getInputProps("name")} />
        <TextInput label="Straße" {...form.getInputProps("street")} />
        <TextInput label="Postleitzahl" {...form.getInputProps("zipCode")} />
        <LocationSelect
          formActionId="update-accomodation-form"
          formField="location"
          label="Standort"
          initialValue={form.values.location}
        />
        <Stack gap={rem(4)}>
          <Text size="sm" fw={500}>
            Verfügbare Betten: {form.values.availableBeds}
          </Text>
          <Slider color="blue" {...form.getInputProps("availableBeds")} />
          {form.errors.availableBeds && (
            <Text size="xs" c="red">
              {form.errors.availableBeds}
            </Text>
          )}
          <Group>
            {Array.from({ length: form.values.availableBeds }, (_, index) => (
              <ThemeIcon key={index} variant="light" size="xl">
                <IconBed style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            ))}
          </Group>
        </Stack>
        <Button loading={status === "executing"} type="submit">
          Aktualisieren
        </Button>
      </Stack>
    </form>
  );
};

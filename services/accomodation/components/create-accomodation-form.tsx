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
import { createAccomodationSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { createAccomodation } from "@services/accomodation/actions";
import { IconBed } from "@tabler/icons-react";

export const CreateAccomodationForm = () => {
  const form = useForm({
    validate: zodResolver(createAccomodationSchema),
    initialValues: {
      number: 0,
      name: "",
      street: "",
      zipCode: "",
      location: "",
      availableBeds: 0,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createAccomodation,
    executeNotification: "Zimmer wird erstellt",
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
        <TextInput label="Standort" {...form.getInputProps("location")} />
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
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

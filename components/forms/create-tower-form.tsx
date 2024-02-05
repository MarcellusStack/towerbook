"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  SegmentedControl,
  Text,
  Checkbox,
} from "@mantine/core";
import { createTowerSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import Image from "next/image";
import { createTower } from "@/server/actions/create-tower";
import { LocationSelect } from "@components/location-select";

export const CreateTowerForm = () => {
  const form = useForm({
    name: "create-tower-form",
    validate: zodResolver(createTowerSchema),
    initialValues: {
      name: "",
      main: false,
      type: "",
      number: "",
      location: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createTower,
    executeNotification: "Turm wird erstellt",
    hideModals: true,
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <SegmentedControl
          mt="md"
          fullWidth
          color="blue"
          {...form.getInputProps("type")}
          data={[
            {
              label: (
                <Stack gap={0} align="center">
                  <Image src="/tower.png" width={64} height={64} alt="tower" />
                  <Text size="lg">Turm</Text>
                </Stack>
              ),
              value: "tower",
            },
            {
              label: (
                <Stack gap={0} align="center">
                  <Image src="/quad.png" width={64} height={64} alt="quad" />
                  <Text size="lg">Quad</Text>
                </Stack>
              ),
              value: "quad",
            },
          ]}
        />
        <TextInput label="Name" {...form.getInputProps("name")} />
        <Checkbox
          label="Hauptturm"
          {...form.getInputProps("main", {
            type: "checkbox",
          })}
        />
        <TextInput
          type="number"
          label="Turmnummer"
          {...form.getInputProps("number")}
        />
        <LocationSelect
          formActionId="create-tower-form"
          formField="location"
          label="Standort"
        />
        <Button loading={status === "executing"} type="submit">
          Hinzufügen
        </Button>
      </Stack>
    </form>
  );
};

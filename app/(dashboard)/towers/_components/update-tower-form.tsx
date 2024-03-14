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
import { updateTowerSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import Image from "next/image";
import { LocationSelect } from "@components/location-select";
import { TowersProps } from "@/server/queries/tower";
import { updateTower } from "@towers/_actions";

export const UpdateTowerForm = ({ tower }: { tower: TowersProps[0] }) => {
  const form = useForm({
    name: "update-tower-form",
    validate: zodResolver(updateTowerSchema),
    initialValues: {
      id: tower.id,
      name: tower.name,
      main: tower.main,
      type: tower.type,
      number: tower.number,
      location: tower.location,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateTower,
    executeNotification: "Turm wird aktualisiert",
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
          formActionId="update-tower-form"
          formField="location"
          label="Standort"
          initialValue={tower.location}
        />
        <Button loading={status === "executing"} type="submit">
          Aktualisieren
        </Button>
      </Stack>
    </form>
  );
};

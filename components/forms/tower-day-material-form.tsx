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
  Card,
  rem,
  ActionIcon,
  Box,
  Textarea,
  Grid,
  SegmentedControl,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { towerDayMaterialSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { IconTrash } from "@tabler/icons-react";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayMaterial } from "@/server/actions/update-tower-day-material";
import { TowerDayMaterialProps } from "@/server/queries/get-tower-day-material";

export const TowerDayMaterialForm = ({
  towerday,
}: {
  towerday: TowerDayMaterialProps;
}) => {
  const form = useForm({
    name: "tower-day-material-form",
    validate: zodResolver(towerDayMaterialSchema),
    initialValues: {
      id: towerday.id,
      material: towerday.material === null ? new Array() : towerday.material,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayMaterial,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Materialien
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Button
              variant="outline"
              onClick={() => {
                form.insertListItem("material", {
                  id: uuidv4(),
                  material: "",
                  checked: "unchecked",
                  comment: "",
                });
              }}
            >
              Material hinzufügen
            </Button>
            <Box />
            <Box />
            {form.values.material &&
              form.values.material.map((material, index) => (
                <Card p="sm" withBorder>
                  <Grid gutter="sm">
                    <Grid.Col span={6}>
                      <TextInput
                        placeholder="Material"
                        {...form.getInputProps(`material.${index}.material`)}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text fw={500} mb={rem(2)}>
                        Einsatzbereit
                      </Text>
                      <SegmentedControl
                        {...form.getInputProps(`material.${index}.checked`)}
                        fullWidth
                        color="blue"
                        data={[
                          { value: "checked", label: "Ja" },
                          { value: "unchecked", label: "Nein" },
                        ]}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Textarea
                        placeholder="Bemerkungen"
                        {...form.getInputProps(`material.${index}.comment`)}
                      />
                      <ActionIcon
                        onClick={() => {
                          form.removeListItem("material", index);
                        }}
                        variant="subtle"
                        color="red"
                      >
                        <IconTrash
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
          </SimpleGrid>
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="materialStatus"
          />
        </Fieldset>
      </Stack>
    </form>
  );
};

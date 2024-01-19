"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  Text,
  Card,
  rem,
  ActionIcon,
  Textarea,
  SegmentedControl,
  Table,
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
              Material Prüfung
            </Text>
          }
        >
          <Stack align="flex-start">
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

            <Table verticalSpacing="sm" striped withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Material</Table.Th>
                  <Table.Th>Bemerkung</Table.Th>
                  <Table.Th>Einsatzbereit</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form.values.material &&
                  form.values.material.map((material, index) => (
                    <Table.Tr key={`${material.id}-${index}`}>
                      <Table.Td>
                        <TextInput
                          placeholder="Material"
                          {...form.getInputProps(`material.${index}.material`)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Textarea
                          placeholder="Bemerkungen"
                          {...form.getInputProps(`material.${index}.comment`)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <SegmentedControl
                          {...form.getInputProps(`material.${index}.checked`)}
                          fullWidth
                          color="blue"
                          data={[
                            { value: "checked", label: "Ja" },
                            { value: "unchecked", label: "Nein" },
                          ]}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          onClick={() => {
                            form.removeListItem("material", index);
                          }}
                          variant="subtle"
                          color="red"
                          size="lg"
                        >
                          <IconTrash
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </Stack>
        </Fieldset>
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="materialStatus"
          />
        </Card>
      </Stack>
    </form>
  );
};

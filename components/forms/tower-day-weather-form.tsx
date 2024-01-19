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
  Table,
  Select,
} from "@mantine/core";
import { towerDayWeatherSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { TimeInput } from "@mantine/dates";
import { IconTrash } from "@tabler/icons-react";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { TowerDayWeatherProps } from "@/server/queries/get-tower-day-weather";
import { updateTowerDayWeather } from "@/server/actions/update-tower-day-weather";
import { v4 as uuidv4 } from "uuid";

export const TowerDayWeatherForm = ({
  towerday,
}: {
  towerday: TowerDayWeatherProps;
}) => {
  const form = useForm({
    name: "tower-day-weather-form",
    validate: zodResolver(towerDayWeatherSchema),
    initialValues: {
      id: towerday.id,
      weather: towerday.weather === null ? new Array() : towerday.weather,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayWeather,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => update.execute(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Wetter
            </Text>
          }
        >
          <Button
            mb="sm"
            variant="outline"
            onClick={() => {
              form.insertListItem("weather", {
                id: uuidv4(),
                time: "",
                air_in_celsius: "",
                water_in_celsius: "",
                wind_in_bft: "",
                wind_direction: "",
              });
            }}
          >
            Wetter hinzufügen
          </Button>
          <Table verticalSpacing="sm" striped withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Zeit</Table.Th>
                <Table.Th>Luft (in °C)</Table.Th>
                <Table.Th>Wasser (in °C)</Table.Th>
                <Table.Th>Wind (in Bft/°)</Table.Th>
                <Table.Th>Windrichtung</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {form.values.weather &&
                form.values.weather.map((weather, index) => (
                  <Table.Tr key={weather.id}>
                    <Table.Td>
                      <TimeInput
                        {...form.getInputProps(`weather.${index}.time`)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        type="number"
                        {...form.getInputProps(
                          `weather.${index}.air_in_celsius`
                        )}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        type="number"
                        {...form.getInputProps(
                          `weather.${index}.water_in_celsius`
                        )}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        type="number"
                        {...form.getInputProps(`weather.${index}.wind_in_bft`)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Select
                        data={[
                          { value: "n", label: "Norden" },
                          { value: "ne", label: "Nordost" },
                          { value: "e", label: "Osten" },
                          { value: "se", label: "Südost" },
                          { value: "s", label: "Süden" },
                          { value: "sw", label: "Südwest" },
                          { value: "w", label: "Westen" },
                          { value: "nw", label: "Nordwest" },
                        ]}
                        {...form.getInputProps(
                          `weather.${index}.wind_direction`
                        )}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        onClick={() => {
                          form.removeListItem("weather", index);
                        }}
                        variant="subtle"
                        color="red"
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
        </Fieldset>
        <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
          {" "}
          <TowerDayFormAction
            updateStatus={update.status === "executing"}
            form="weatherStatus"
          />
        </Card>
      </Stack>
    </form>
  );
};

"use client";
import { MantineTable } from "@/components/mantine-table";
import { tableColumnProps } from "@/constants";
import { weatherSchema } from "@/schemas";
import { ActionIcon, Button, Fieldset, Group, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const WeatherForm = () => {
  const form = useForm({
    validate: zodResolver(weatherSchema),
    initialValues: {
      weather: [],
    },
  });
  return (
    <form>
      <Fieldset
        legend={
          <Text fw={700} size="xl">
            Wetter
          </Text>
        }
      >
        <MantineTable
          records={form.values.weather}
          columns={[
            {
              accessor: "time",
              title: "Zeit",
              render: (_, index) => (
                <>
                  <TimeInput {...form.getInputProps(`weather.${index}.time`)} />
                </>
              ),
              ...tableColumnProps,
            },

            {
              accessor: "actions",
              title: "Aktionen",
              width: "0%",
              render: (_, index) => (
                <ActionIcon
                  className="self-end"
                  onClick={() => {
                    form.removeListItem("weather", index);
                  }}
                  variant="subtle"
                  color="red"
                >
                  <IconTrash
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              ),
              ...tableColumnProps,
            },
          ]}
          storeKey="weather-table"
        />
        <Group justify="flex-end" mt="sm">
          <Button
            className="self-end"
            variant="outline"
            onClick={() => {
              form.insertListItem(`weather`, {
                id: uuidv4(),
                time: "",
              });
            }}
          >
            Wetter hinzufügen
          </Button>
          <Button variant="filled">Aktualisieren</Button>
        </Group>
      </Fieldset>
    </form>
  );
};

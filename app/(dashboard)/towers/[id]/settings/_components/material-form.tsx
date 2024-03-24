"use client";
import { MantineTable } from "@/components/mantine-table";
import { tableColumnProps } from "@/constants";
import {
  materialsSchema,
  towerdayAdministrationMaterialSchema,
} from "@/schemas";
import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const MaterialForm = () => {
  const form = useForm({
    validate: zodResolver(materialsSchema),
    initialValues: {
      materials: [],
    },
  });
  return (
    <form>
      <Fieldset
        legend={
          <Text fw={700} size="xl">
            Materialien
          </Text>
        }
      >
        <MantineTable
          records={form.values.materials}
          columns={[
            {
              accessor: "material",
              title: "Material",
              render: (_, index) => (
                <>
                  <TextInput
                    {...form.getInputProps(`materials.${index}.material`)}
                  />
                </>
              ),
              ...tableColumnProps,
            },
            {
              accessor: "period",
              title: "Zeitraum",
              render: (_, index) => (
                <Select
                  placeholder="Zeitraum"
                  data={[
                    {
                      label: "Täglich",
                      value: "daily",
                    },
                    {
                      label: "Wöchentlich",
                      value: "weekly",
                    },
                    {
                      label: "Monatlich",
                      value: "monthly",
                    },
                  ]}
                  {...form.getInputProps(`materials.${index}.type`)}
                />
              ),
              ...tableColumnProps,
            },
            {
              accessor: "period_weekly",
              title: "Wochentag",
              render: (_, index) => (
                <Select
                  disabled={form.values.materials[index].type !== "weekly"}
                  placeholder="Wochentag"
                  data={[
                    {
                      label: "Montag",
                      value: "monday",
                    },
                    {
                      label: "Dienstag",
                      value: "tuesday",
                    },
                    {
                      label: "Mittwoch",
                      value: "wednesday",
                    },
                    {
                      label: "Donnerstag",
                      value: "thursday",
                    },
                    {
                      label: "Freitag",
                      value: "friday",
                    },
                    {
                      label: "Samstag",
                      value: "saturday",
                    },
                    {
                      label: "Sonntag",
                      value: "sunday",
                    },
                  ]}
                  {...form.getInputProps(`materials.${index}.day`)}
                />
              ),
              ...tableColumnProps,
            },
            {
              accessor: "period_monthly",
              title: "Wochentag",
              render: (_, index) => (
                <DatePickerInput
                  disabled={form.values.materials[index].type !== "monthly"}
                  clearable
                  locale="de"
                  placeholder="Tag"
                  valueFormat="DD"
                  {...form.getInputProps(`material.${index}.date`)}
                  value={
                    form.values.materials[index].date
                      ? new Date(form.values.materials[index].date)
                      : null
                  }
                />
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
                    form.removeListItem("materials", index);
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
          storeKey="material-table"
        />
        <Group justify="flex-end" mt="sm">
          <Button
            className="self-end"
            variant="outline"
            onClick={() => {
              form.insertListItem("materials", {
                id: uuidv4(),
                material: "",
                type: "",
                day: "",
                date: new Date(),
              });
            }}
          >
            Material hinzufügen
          </Button>
          <Button variant="filled">Aktualisieren</Button>
        </Group>
      </Fieldset>
    </form>
  );
};

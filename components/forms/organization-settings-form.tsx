"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Select,
  Text,
  Box,
  Card,
  Group,
  ActionIcon,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Popover,
} from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { MultiSelectCreatable } from "@components/inputs/multi-select-creatable";
import { z } from "zod";
import {
  updateBeachSections,
  updateLocations,
  updateName,
  updateTowerDayAdministration,
} from "@/server/actions/organization";
import { type OrganizationSettingsProps } from "@/server/queries/organization";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { v4 as uuidv4 } from "uuid";
import {
  beachSectionsSchema,
  towerdayAdministrationTodoSchema,
  towerdayAdministrationMaterialSchema,
  towerdayAdministrationWeatherSchema,
} from "@/schemas";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  updateTowerdayAdministrationMaterial,
  updateTowerdayAdministrationTodo,
  updateTowerdayAdministrationWeather,
} from "@settings/organization/_actions";

export const OrganizationSettingsForm = ({
  organization,
}: {
  organization: OrganizationSettingsProps;
}) => {
  const form = useForm({
    validate: zodResolver(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name muss mindestens 3 Zeichen lang sein" }),
      })
    ),
    initialValues: {
      name: organization.name,
    },
  });

  const locationsForm = useForm({
    name: "location-form",
    validate: zodResolver(
      z.object({
        towerLocations: z.array(z.string()),
      })
    ),
    initialValues: {
      towerLocations: organization.towerLocations,
    },
  });

  const beachSectionsForm = useForm({
    validate: zodResolver(beachSectionsSchema),
    initialValues: {
      beachSections:
        organization.beachSections === null
          ? new Array()
          : organization.beachSections,
    },
  });

  const towerdayAdministrationWeatherForm = useForm({
    validate: zodResolver(towerdayAdministrationWeatherSchema),
    initialValues: {
      weather:
        organization.weather === null ? new Array() : organization.weather,
    },
  });

  const towerdayAdministrationTodoForm = useForm({
    validate: zodResolver(towerdayAdministrationTodoSchema),
    initialValues: {
      todo: organization.todo === null ? new Array() : organization.todo,
    },
  });

  const towerdayAdministrationMaterialForm = useForm({
    validate: zodResolver(towerdayAdministrationMaterialSchema),
    initialValues: {
      material:
        organization.material === null ? new Array() : organization.material,
    },
  });

  const updateNameAction = useActionNotification({
    action: updateName,
    executeNotification: `Name wird aktualisiert`,
  });

  const updateLocationsAction = useActionNotification({
    action: updateLocations,
    executeNotification: `Standort wird aktualisiert`,
  });

  const updateBeachSectionsAction = useActionNotification({
    action: updateBeachSections,
    executeNotification: `Strandabschnitte wird aktualisiert`,
  });

  const updateTowerdayAdministrationWeatherAction = useActionNotification({
    action: updateTowerdayAdministrationWeather,
    executeNotification: `Turm Tag Wetter wird aktualisiert`,
  });

  const updateTowerdayAdministrationTodoAction = useActionNotification({
    action: updateTowerdayAdministrationTodo,
    executeNotification: `Turm Tag Todos werden aktualisiert`,
  });

  const updateTowerdayAdministrationMaterialAction = useActionNotification({
    action: updateTowerdayAdministrationMaterial,
    executeNotification: `Turm Tag Material wird aktualisiert`,
  });

  return (
    <Stack gap="md">
      <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
        <Fieldset
          id="update-email"
          legend={
            <Text fw={700} size="xl">
              Name aktualisieren
            </Text>
          }
        >
          <form
            onSubmit={form.onSubmit((values) =>
              updateNameAction.execute({ name: values.name })
            )}
          >
            <Stack gap="sm">
              <TextInput {...form.getInputProps("name")} label="Name" />
              <Button
                variant="filled"
                type="submit"
                loading={updateNameAction.status === "executing"}
                className="self-end"
              >
                Aktualisieren
              </Button>
            </Stack>
          </form>
        </Fieldset>
        <Fieldset
          id="locations"
          legend={
            <Text fw={700} size="xl">
              Standorte
            </Text>
          }
        >
          <form
            onSubmit={locationsForm.onSubmit((values) =>
              updateLocationsAction.execute({
                towerLocations: values.towerLocations,
              })
            )}
          >
            <Stack gap="sm">
              <MultiSelectCreatable
                formActionId="location-form"
                formField="towerLocations"
                initialValues={organization.towerLocations}
                label="Standorte"
              />
              <Button
                variant="filled"
                type="submit"
                loading={updateLocationsAction.status === "executing"}
                className="self-end"
              >
                Aktualisieren
              </Button>
            </Stack>
          </form>
        </Fieldset>
      </SimpleGrid>
      <form
        onSubmit={beachSectionsForm.onSubmit((values) =>
          updateBeachSectionsAction.execute({
            beachSections: values.beachSections,
          })
        )}
      >
        <Fieldset
          id="beach-sections"
          legend={
            <Text fw={700} size="xl">
              Strandabschnitte
            </Text>
          }
        >
          <Stack gap="md">
            {beachSectionsForm.values.beachSections &&
              beachSectionsForm.values.beachSections.map(
                (beach, beachIndex) => (
                  <Table
                    key={beach.id}
                    verticalSpacing="sm"
                    striped
                    withTableBorder
                  >
                    <TableThead>
                      <TableTr>
                        <TableTh>Aufgang Nummer</TableTh>
                        <TableTh>Symbol</TableTh>
                        <TableTh>Standort ({beach.location})</TableTh>
                        <TableTh>
                          <Button
                            onClick={() => {
                              beachSectionsForm.insertListItem(
                                `beachSections.${beachIndex}.sections`,
                                {
                                  id: uuidv4(),
                                  number: "",
                                  symbol: "",
                                }
                              );
                            }}
                          >
                            Hinzufügen
                          </Button>
                        </TableTh>
                      </TableTr>
                    </TableThead>
                    <TableTbody>
                      {beach.sections.map((section, index) => (
                        <TableTr key={section.id}>
                          <TableTd>
                            <TextInput
                              type="number"
                              {...beachSectionsForm.getInputProps(
                                `beachSections.${beachIndex}.sections.${index}.number`
                              )}
                            />
                          </TableTd>
                          <TableTd>
                            <Group gap="xs">
                              <Text size="sm">{section.symbol}</Text>
                              <Popover
                                width={200}
                                position="bottom"
                                withArrow
                                shadow="md"
                              >
                                <Popover.Target>
                                  <ActionIcon
                                    size="md"
                                    variant="light"
                                    aria-label="Emoji Picker"
                                  >
                                    <IconPencil
                                      style={{ width: "70%", height: "70%" }}
                                      stroke={1.5}
                                    />
                                  </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                  <EmojiPicker
                                    onEmojiClick={(
                                      emojiData: EmojiClickData
                                    ) => {
                                      beachSectionsForm.setFieldValue(
                                        `beachSections.${beachIndex}.sections.${index}.symbol`,
                                        emojiData.emoji
                                      );
                                    }}
                                  />
                                </Popover.Dropdown>
                              </Popover>
                            </Group>
                          </TableTd>
                          <TableTd>
                            <Text size="sm">{beach.location}</Text>
                          </TableTd>
                          <TableTd>
                            <ActionIcon
                              onClick={() => {
                                beachSectionsForm.removeListItem(
                                  `beachSections.${beachIndex}.sections`,
                                  index
                                );
                              }}
                              size="md"
                              variant="subtle"
                              color="red"
                            >
                              <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                              />
                            </ActionIcon>
                          </TableTd>
                        </TableTr>
                      ))}
                    </TableTbody>
                  </Table>
                )
              )}
            <Button
              variant="filled"
              type="submit"
              loading={updateBeachSectionsAction.status === "executing"}
              className="self-end"
            >
              Aktualisieren
            </Button>
          </Stack>
        </Fieldset>
      </form>
      <Fieldset
        id="tower-day-administration-weather"
        legend={
          <Text fw={700} size="xl">
            Wetter
          </Text>
        }
      >
        <form
          onSubmit={towerdayAdministrationWeatherForm.onSubmit((values) =>
            updateTowerdayAdministrationWeatherAction.execute({
              weather: values.weather,
            })
          )}
        >
          <Stack gap="sm">
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              {towerdayAdministrationWeatherForm.values.weather &&
                towerdayAdministrationWeatherForm.values.weather.map(
                  (weather, index) => (
                    <Card key={`${weather.id}`} padding="sm" withBorder>
                      <Stack justify="space-between" gap="sm">
                        <TimeInput
                          {...towerdayAdministrationWeatherForm.getInputProps(
                            `weather.${index}.time`
                          )}
                        />

                        <ActionIcon
                          onClick={() => {
                            towerdayAdministrationWeatherForm.removeListItem(
                              `weather`,
                              index
                            );
                          }}
                          size="md"
                          variant="subtle"
                          color="red"
                          className="self-end"
                        >
                          <IconTrash
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Stack>
                    </Card>
                  )
                )}
            </SimpleGrid>
            <Button
              className="self-start"
              variant="outline"
              onClick={() => {
                towerdayAdministrationWeatherForm.insertListItem(`weather`, {
                  id: uuidv4(),
                  time: "",
                });
              }}
            >
              Wetter Hinzufügen
            </Button>
            <Button
              variant="filled"
              type="submit"
              loading={
                updateTowerdayAdministrationWeatherAction.status === "executing"
              }
              className="self-end"
            >
              Aktualisieren
            </Button>
          </Stack>
        </form>
      </Fieldset>
      <Fieldset
        id="tower-day-administration-material"
        legend={
          <Text fw={700} size="xl">
            Material
          </Text>
        }
      >
        <form
          onSubmit={towerdayAdministrationMaterialForm.onSubmit((values) =>
            updateTowerdayAdministrationMaterialAction.execute({
              material: values.material,
            })
          )}
        >
          <Stack gap="sm">
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              {towerdayAdministrationMaterialForm.values.material &&
                towerdayAdministrationMaterialForm.values.material.map(
                  (field, index: number) => (
                    <Card key={`${field.id}-${index}`} padding="sm" withBorder>
                      <Stack justify="space-between" gap="sm">
                        <TextInput
                          {...towerdayAdministrationMaterialForm.getInputProps(
                            `material.${index}.material`
                          )}
                        />

                        <ActionIcon
                          className="self-end"
                          onClick={() => {
                            towerdayAdministrationMaterialForm.removeListItem(
                              "material",
                              index
                            );
                          }}
                          variant="subtle"
                          color="red"
                        >
                          <IconTrash
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Stack>
                    </Card>
                  )
                )}
            </SimpleGrid>
            <Button
              className="self-start"
              variant="outline"
              onClick={() => {
                towerdayAdministrationMaterialForm.insertListItem("material", {
                  id: uuidv4(),
                  material: "",
                });
              }}
            >
              Material hinzufügen
            </Button>
            <Button
              variant="filled"
              type="submit"
              loading={
                updateTowerdayAdministrationMaterialAction.status ===
                "executing"
              }
              className="self-end"
            >
              Aktualisieren
            </Button>
          </Stack>
        </form>
      </Fieldset>
      <Fieldset
        id="tower-day-administration-todo"
        legend={
          <Text fw={700} size="xl">
            Todos
          </Text>
        }
      >
        <form
          onSubmit={towerdayAdministrationTodoForm.onSubmit((values) =>
            updateTowerdayAdministrationTodoAction.execute({
              todo: values.todo,
            })
          )}
        >
          <Stack gap="sm">
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              {towerdayAdministrationTodoForm.values.todo &&
                towerdayAdministrationTodoForm.values.todo.map(
                  (field, index: number) => (
                    <Card key={`${field.id}-${index}`} padding="sm" withBorder>
                      <Stack justify="space-between">
                        <TextInput
                          {...towerdayAdministrationTodoForm.getInputProps(
                            `todo.${index}.todo`
                          )}
                        />
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
                          {...towerdayAdministrationTodoForm.getInputProps(
                            `todo.${index}.type`
                          )}
                        />
                        {towerdayAdministrationTodoForm.values.todo[index]
                          .type === "weekly" && (
                          <Select
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
                            {...towerdayAdministrationTodoForm.getInputProps(
                              `todo.${index}.day`
                            )}
                          />
                        )}
                        {towerdayAdministrationTodoForm.values.todo[index]
                          .type === "monthly" && (
                          <DatePickerInput
                            clearable
                            locale="de"
                            placeholder="Tag"
                            valueFormat="DD"
                            {...towerdayAdministrationTodoForm.getInputProps(
                              `todo.${index}.date`
                            )}
                            value={
                              towerdayAdministrationTodoForm.values.todo[index]
                                .date
                                ? new Date(
                                    towerdayAdministrationTodoForm.values.todo[
                                      index
                                    ].date
                                  )
                                : null
                            }
                          />
                        )}
                        <ActionIcon
                          onClick={() => {
                            towerdayAdministrationTodoForm.removeListItem(
                              "todo",
                              index
                            );
                          }}
                          variant="subtle"
                          color="red"
                          className="self-end"
                        >
                          <IconTrash
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Stack>
                    </Card>
                  )
                )}
            </SimpleGrid>
            <Button
              className="self-start"
              variant="outline"
              onClick={() => {
                towerdayAdministrationTodoForm.insertListItem("todo", {
                  id: uuidv4(),
                  todo: "",
                  type: "",
                  day: "",
                  date: new Date(),
                });
              }}
            >
              Todo hinzufügen
            </Button>
            <Button
              variant="filled"
              type="submit"
              loading={
                updateTowerdayAdministrationTodoAction.status === "executing"
              }
              className="self-end"
            >
              Aktualisieren
            </Button>
          </Stack>
        </form>
      </Fieldset>
    </Stack>
  );
};

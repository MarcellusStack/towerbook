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
  Checkbox,
  Group,
  Card,
  rem,
  ActionIcon,
  Box,
  Table,
  NumberInput,
  ThemeIcon,
} from "@mantine/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { towerDayDutyPlanSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type TowerDay } from "@prisma/client";
import {
  IconShieldLock,
  IconTrash,
  IconCalendarOff,
  IconCalendarX,
  IconCalendarPlus,
  IconCalendarEvent,
} from "@tabler/icons-react";

import { UserComboboxButton } from "@components/user-combobox-button";
import { modals } from "@mantine/modals";
import { UserSelect } from "@components/user-select";
import { updateTowerDayWatchmanPlan } from "@/server/actions/update-tower-day-watchman-plan";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { DeleteModalAction } from "@components/delete-modal-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { TowerDayTodoProps } from "@/server/queries/get-tower-day-todo";
import { TowerDayWeatherProps } from "@/server/queries/get-tower-day-weather";
import { updateTowerDayWeather } from "@/server/actions/update-tower-day-weather";
import deLocale from "@fullcalendar/core/locales/de";
import { createDutyPlan } from "@/server/actions/create-duty-plan";
import { deleteDutyPlan } from "@/server/actions/delete-duty-plan";
import { CreateShiftForm } from "@components/forms/create-shift-form";
import { updateTowerDayDutyPlan } from "@/server/actions/update-tower-day-duty-plan";

export const TowerDayDutyPlanForm = ({
  towerday,
}: {
  towerday: TowerDayWeatherProps;
}) => {
  const form = useForm({
    name: "tower-day-duty-plan-form",
    validate: zodResolver(towerDayDutyPlanSchema),
    initialValues: {
      towerDayId: towerday.id,
      towerId: towerday.towerId,
      dutyPlanId: towerday.dutyplan === null ? "" : towerday.dutyplan.id,
      shifts:
        towerday.dutyplan === null ? new Array() : towerday.dutyplan.shifts,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayDutyPlan,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  const create = useActionNotification({
    action: createDutyPlan,
    executeNotification: `Dienstplan wird erstellt`,
  });

  return (
    <>
      {!towerday.dutyplan && (
        <Card withBorder>
          <Stack>
            <Text>Es wurde noch kein Dienstplan erstellt.</Text>
            <Group>
              <Button
                loading={create.status === "executing"}
                onClick={() => {
                  create.execute({
                    towerId: towerday.towerId,
                    towerDayId: towerday.id,
                    date: new Date(towerday.createdAt),
                  });
                }}
              >
                Erstellen
              </Button>
              <Button>Dienstplan hinzufügen</Button>
            </Group>
          </Stack>
        </Card>
      )}
      {towerday.dutyplan && (
        <form
          onSubmit={form.onSubmit((values) => {
            update.execute(values);
          })}
        >
          <Stack gap="md">
            <Fieldset
              legend={
                <Text fw={700} size="xl">
                  Dienstplan
                </Text>
              }
            >
              <Group justify="space-between" mb="xs">
                <Button
                  variant="subtle"
                  leftSection={<IconCalendarEvent />}
                  onClick={() => {
                    modals.open({
                      title: "Schicht hinzufügen",
                      children: (
                        <>
                          <CreateShiftForm />
                        </>
                      ),
                    });
                  }}
                >
                  Hinzufügen
                </Button>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: "Dienstplan löschen",
                      children: (
                        <>
                          <DeleteModalAction
                            id={towerday.dutyplan.id}
                            action={deleteDutyPlan}
                            model="Dienstplan"
                          />
                        </>
                      ),
                    });
                  }}
                  variant="subtle"
                  size="lg"
                  color="red"
                >
                  <IconTrash
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Group>
              <FullCalendar
                height={720}
                locales={[deLocale]}
                plugins={[timeGridPlugin, interactionPlugin]}
                dateClick={(event) => {
                  modals.open({
                    title: "Schicht hinzufügen",
                    children: (
                      <>
                        <CreateShiftForm date={new Date(event.date)} />
                      </>
                    ),
                  });
                }}
                eventClick={(event) => {
                  modals.open({
                    title: "Schicht löschen",
                    children: (
                      <>
                        <Stack gap="md">
                          <Text size="sm">
                            Sind sie sicher, dass Sie diese Schicht löschen
                            wollen? Diese Aktion ist unwiderruflich.
                          </Text>
                          <Group gap="sm">
                            <Button
                              fullWidth
                              color="red"
                              onClick={() => {
                                form.removeListItem(
                                  "shifts",
                                  event.event.extendedProps.index
                                );
                                modals.closeAll();
                              }}
                            >
                              Schicht löschen
                            </Button>
                          </Group>
                        </Stack>
                      </>
                    ),
                  });

                  console.log();
                }}
                selectable={true}
                slotDuration={"01:00"}
                initialView="timeGridDay"
                events={form.values.shifts.map((shift, index) => ({
                  index: index,
                  id: shift.id,
                  title: `${shift.user.firstName} ${shift.user.lastName}`,
                  start: shift.startTime,
                  end: shift.endTime,
                  color: shift.type === "duty" ? "green" : "gray",
                }))}
              />

              <TowerDayFormAction
                updateStatus={update.status === "executing"}
                form="dutyplanStatus"
              />
            </Fieldset>
          </Stack>
        </form>
      )}
    </>
  );
};

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
} from "@mantine/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  towerDayTodoSchema,
  towerDayWatchmanPlanSchema,
  towerDayWeatherSchema,
} from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { type TowerDay } from "@prisma/client";
import { IconShieldLock, IconTrash } from "@tabler/icons-react";
import { UserComboboxButton } from "@components/user-combobox-button";
import { modals } from "@mantine/modals";
import { UserSelect } from "@components/user-select";
import { updateTowerDayWatchmanPlan } from "@/server/actions/update-tower-day-watchman-plan";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { updateTowerDayTodo } from "@/server/actions/update-tower-day-todo";
import { TowerDayTodoProps } from "@/server/queries/get-tower-day-todo";
import { TowerDayWeatherProps } from "@/server/queries/get-tower-day-weather";
import { updateTowerDayWeather } from "@/server/actions/update-tower-day-weather";
import deLocale from "@fullcalendar/core/locales/de";

export const TowerDayDutyPlanForm = ({
  towerday,
}: {
  towerday: TowerDayWeatherProps;
}) => {
  const form = useForm({
    name: "tower-day-duty-plan-form",
    validate: zodResolver(towerDayWeatherSchema),
    initialValues: {},
  });

  /* const update = useActionNotification({
    action: updateTowerDayWeather,
    executeNotification: `Turm Tag wird aktualisiert`,
  }); */

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Dienstplan
            </Text>
          }
        >
          <Button
            mb="sm"
            variant="outline"
            /* onClick={() => {
              form.insertListItem("weather", {
                id: `${Math.floor(Math.random() * 1000000)}`,
                time: "",
                air_in_celsius: "",
                water_in_celsius: "",
                wind_in_bft: "",
              });
            }} */
          >
            Hinzufügen
          </Button>
          <FullCalendar
            height={720}
            locales={[deLocale]}
            plugins={[timeGridPlugin, interactionPlugin]}
            dateClick={(e) => {
              modals.open({
                title: "Test",
                children: (
                  <>
                    <Text c="dimmed" size="sm">
                      {e.dateStr}
                    </Text>
                  </>
                ),
              });
              console.log(e);
            }}
            selectable={true}
            /* select={(e) => {
              

              console.log(e.dateStr);
            }} */
            slotDuration={"01:00"}
            initialView="timeGridDay"
            initialEvents={[
              {
                title: "Marcel Pohl",
                start: new Date("2023-11-12T07:00:00+01:00"),
              },
              {
                title: "Marcel Pohl",
                start: new Date("2023-11-12T07:00:00+01:00"),
                color: "gray",
              },
            ]}
          />

          <TowerDayFormAction updateStatus={false} form="dutyplanStatus" />
        </Fieldset>
      </Stack>
    </form>
  );
};

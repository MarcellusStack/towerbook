import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";
import { Button, Group, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { CreateShiftForm } from "@components/forms/create-shift-form";
import { createFormActions } from "@mantine/form";
import { type ShiftType, type Shift, type Profile } from "@prisma/client";
import { shiftTypes } from "@/constants/shift-types";
import { convertTime } from "@/utils";

export type ShiftProps = Pick<Shift, "id" | "startTime" | "endTime" | "type">;

export type ExtendShiftProps = ShiftProps & {
  user: Pick<Profile, "firstName" | "lastName">;
};

export const TowerDayDutyPlan = ({
  shifts,
  shiftType,
}: {
  shifts: ExtendShiftProps[];
  shiftType: ShiftType;
}) => {
  const formAction = createFormActions("tower-day-duty-plan-form");
  return (
    <FullCalendar
      allDaySlot={false}
      height={720}
      locales={[deLocale]}
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "title",
        center: "",
        right: "",
      }}
      titleFormat={(info) =>
        `${shiftTypes.filter((type) => type.value === shiftType)[0].label}`
      }
      dateClick={(event) => {
        modals.open({
          title: "Schicht hinzufügen",
          children: (
            <>
              <CreateShiftForm
                shiftType={shiftType}
                time={convertTime(new Date(event.date))}
              />
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
                  Sind sie sicher, dass Sie diese Schicht löschen wollen? Diese
                  Aktion ist unwiderruflich.
                </Text>
                <Group gap="sm">
                  <Button
                    fullWidth
                    color="red"
                    onClick={() => {
                      formAction.setFieldValue(
                        "shifts",
                        shifts.filter((shift) => shift.id !== event.event.id)
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
      }}
      slotMinTime={"08:00:00"}
      slotMaxTime={"19:00:00"}
      selectable={true}
      slotDuration={"01:00"}
      initialView="timeGridDay"
      events={shifts
        .filter((shift) => shift.type === shiftType)
        .map((filteredShift, index) => ({
          index: index,
          id: filteredShift.id,
          title: `${filteredShift.user.firstName} ${filteredShift.user.lastName}`,
          start: filteredShift.startTime,
          end: filteredShift.endTime,
          color: filteredShift.type === "duty" ? "green" : "gray",
        }))}
    />
  );
};

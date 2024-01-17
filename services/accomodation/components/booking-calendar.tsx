"use client";

import FullCalendar from "@fullcalendar/react";
import deLocale from "@fullcalendar/core/locales/de";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, Group, Stack, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import React from "react";
import { modals } from "@mantine/modals";
import { CreateBookingForm } from "@/components/booking/create-booking-form";
import { useSession } from "next-auth/react";

export const BookingCalendar = ({ bookings }) => {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Reservierungen
          </Text>
          <IconCalendar size={28} stroke={1.5} />
        </Group>
        <FullCalendar
          height={720}
          locales={[deLocale]}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={bookings.map((book) => ({
            id: book.id,
            allDay: true,
            start: book.date,
            end: book.endTime,
            color: book.user.userId === session?.user?.id ? "green" : "gray",
          }))}
          dateClick={(event) => {
            modals.open({
              title: "Reservierung hinzufügen",
              children: (
                <>
                  <CreateBookingForm date={new Date(event.date)} />
                </>
              ),
            });
          }}
          /* eventClick={(event) => {
            modals.open({
              title: "Reservierung löschen",
              children: (
                <>
                  <Stack gap="md">
                    <Text size="sm">
                      Sind sie sicher, dass Sie diese Reservierung löschen wollen?
                      Diese Aktion ist unwiderruflich.
                    </Text>
                    <Group gap="sm">
                      
                    </Group>
                  </Stack>
                </>
              ),
            });
          }} */
        />
      </Stack>
    </Card>
  );
};

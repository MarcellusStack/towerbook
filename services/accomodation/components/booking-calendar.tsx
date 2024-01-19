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
import { DeleteModalAction } from "@/components/delete-modal-action";
import { AccomodationProps } from "@services/accomodation/queries";
import { deleteBooking } from "@/server/actions/booking";

export const BookingCalendar = ({
  bookings,
}: {
  bookings: AccomodationProps["bookings"];
}) => {
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
            end: book.date,
            color: book.user.id === session?.user?.id ? "green" : "gray",
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
          eventClick={(event) => {
            modals.open({
              title: "Reservierung löschen",
              children: (
                <>
                  <DeleteModalAction
                    id={event.event.id}
                    model="Buchung"
                    action={deleteBooking}
                  />
                </>
              ),
            });
          }}
        />
      </Stack>
    </Card>
  );
};

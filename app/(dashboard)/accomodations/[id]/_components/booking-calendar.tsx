"use client";

import FullCalendar from "@fullcalendar/react";
import deLocale from "@fullcalendar/core/locales/de";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconUser } from "@tabler/icons-react";
import React from "react";
import { modals } from "@mantine/modals";
import { CreateBookingForm } from "@/components/booking/create-booking-form";
import { useUser } from "@clerk/nextjs";
import { DeleteModalAction } from "@/components/delete-modal-action";
import { deleteBooking } from "@/server/actions/booking";
import { useGetAccomodationBookings } from "@accomodations/[id]/_data";
import { useParams } from "next/navigation";
import { FormLoader } from "@/components/loader/form-loader";
import { CreateMultipleBookingForm } from "@/components/booking/create-multiple-booking-form";

export const BookingCalendar = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();

  const { data: bookings, isPending } = useGetAccomodationBookings(
    id as string
  );

  if (isPending || !bookings || !isLoaded) return <FormLoader />;

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
          dayCellContent={(args) => {
            const bookingsOnThisDay = bookings.bookings.filter(
              (book) =>
                new Date(book.date).setHours(0, 0, 0, 0) ===
                args.date.setHours(0, 0, 0, 0)
            );

            return (
              <Group justify="space-between" w="100%">
                <Group gap="2">
                  <ThemeIcon variant="white" color="black" bg="transparent">
                    <IconUser
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                  <Text size="sm">
                    {`${bookingsOnThisDay.length}/${bookings.availableBeds}`}
                  </Text>
                </Group>

                <Text>{args.date.getDate()}</Text>
              </Group>
            );
          }}
          dayCellClassNames={(args) => {
            const bookingsOnThisDay = bookings.bookings.filter(
              (book) =>
                new Date(book.date).setHours(0, 0, 0, 0) ===
                args.date.setHours(0, 0, 0, 0)
            );
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (
              args.date < today ||
              bookingsOnThisDay.length >= bookings.availableBeds
            ) {
              return "greyed-out";
            } else {
              return "";
            }
          }}
          selectAllow={(selectInfo) => {
            const bookingsOnThisDay = bookings.bookings.filter(
              (book) =>
                new Date(book.date).setHours(0, 0, 0, 0) ===
                new Date(selectInfo.startStr).setHours(0, 0, 0, 0)
            );
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return (
              bookingsOnThisDay.length < bookings.availableBeds &&
              new Date(selectInfo.startStr) >= today
            );
          }}
          height={720}
          locales={[deLocale]}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={(event) => {
            const startDate = new Date(event.startStr).setHours(0, 0, 0, 0);
            const endDate = new Date(event.endStr).setHours(0, 0, 0, 0);

            const bookingsInRange = bookings.bookings.filter((book) => {
              const bookDate = new Date(book.date).setHours(0, 0, 0, 0);
              return bookDate >= startDate && bookDate <= endDate;
            });

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (
              bookingsInRange.length < bookings.availableBeds &&
              new Date(event.startStr) >= today
            ) {
              modals.open({
                title: "Reservierung hinzufügen",
                children: (
                  <>
                    <CreateMultipleBookingForm
                      startDate={new Date(event.startStr)}
                      endDate={new Date(event.endStr)}
                    />
                  </>
                ),
              });
            }
          }}
          dateClick={(event) => {
            const bookingsOnThisDay = bookings.bookings.filter(
              (book) =>
                new Date(book.date).setHours(0, 0, 0, 0) ===
                new Date(event.date).setHours(0, 0, 0, 0)
            );
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (
              bookingsOnThisDay.length < bookings.availableBeds &&
              event.date >= today
            ) {
              modals.open({
                title: "Reservierung hinzufügen",
                children: (
                  <>
                    <CreateBookingForm date={new Date(event.date)} />
                  </>
                ),
              });
            }
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

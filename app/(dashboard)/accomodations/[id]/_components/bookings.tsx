import { MantineTable } from "@/components/mantine-table";
import { tableColumnProps } from "@/constants";
import { useActionNotification } from "@/hooks/use-action-notification";
import { convertDate } from "@/utils";
import {
  AccomodationProps,
  cancelBooking,
  confirmBooking,
  deleteBooking,
} from "@accomodations/[id]/_actions";
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  IconCalendarCancel,
  IconCalendarEvent,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import React from "react";

export const Bookings = ({
  bookings,
}: {
  bookings: AccomodationProps["bookings"];
}) => {
  const confirm = useActionNotification({
    action: confirmBooking,
    executeNotification: "Buchung wird bestätigt",
  });

  const remove = useActionNotification({
    action: deleteBooking,
    executeNotification: "Buchung wird gelöscht",
  });

  const cancel = useActionNotification({
    action: cancelBooking,
    executeNotification: "Buchung wird storniert",
  });

  return (
    <Stack gap="sm">
      <Text fw={700} size="xl">
        Buchungen
      </Text>
      <ScrollArea h={360}>
        <Stack gap="xs">
          {bookings
            .filter((booking) => booking.status === "open")
            .map((filteredBooking) => (
              <Card key={filteredBooking.id} padding="xs" withBorder>
                <Stack gap={rem(4)}>
                  <Group gap="xs">
                    <Avatar color="blue" radius="xl">
                      {filteredBooking.user.firstName?.charAt(0)}
                      {filteredBooking.user.lastName?.charAt(0)}
                    </Avatar>
                    <Group gap={rem(4)}>
                      <Text>{filteredBooking.user.firstName}</Text>
                      <Text>{filteredBooking.user.lastName}</Text>
                    </Group>
                  </Group>
                  <Group gap={rem(4)}>
                    <ThemeIcon variant="white" color="black" bg="transparent">
                      <IconCalendarEvent
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ThemeIcon>
                    <Text>{convertDate(filteredBooking.date)}</Text>
                  </Group>
                  <Group justify="end" gap={rem(4)}>
                    <ActionIcon
                      loading={remove.status === "executing"}
                      onClick={() => {
                        remove.execute({ id: filteredBooking.id });
                      }}
                      variant="outline"
                      color="red"
                      aria-label="decline booking"
                    >
                      <IconX
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      loading={confirm.status === "executing"}
                      onClick={() => {
                        confirm.execute({ id: filteredBooking.id });
                      }}
                      variant="filled"
                      aria-label="accept booking"
                    >
                      <IconCheck
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Card>
            ))}
        </Stack>
      </ScrollArea>
      <MantineTable
        records={bookings || []}
        columns={[
          {
            accessor: "user",
            title: "Benutzer",
            render: ({ user }) => (
              <>
                <Avatar color="blue" radius="xl">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </Avatar>
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "firstName",
            title: "Vorname",
          },
          {
            accessor: "lastName",
            title: "Nachname",
            ...tableColumnProps,
          },
          {
            accessor: "date",
            title: "Datum",
            render: ({ date }) => <Text>{convertDate(date)}</Text>,
            ...tableColumnProps,
          },
          {
            accessor: "location",
            title: "Standort",
            ...tableColumnProps,
          },
          {
            accessor: "actions",
            title: "Aktionen",
            width: "0%",
            render: ({ id }) => (
              <Group gap={0} justify="flex-end">
                <ViewActionIcon href={`/towers/${id}`} />
                <DeleteActionIcon id={id} action={deleteTower} model="Turm" />
              </Group>
            ),
            ...tableColumnProps,
          },
        ]}
        storeKey="towers-table"
      />
    </Stack>
  );
};

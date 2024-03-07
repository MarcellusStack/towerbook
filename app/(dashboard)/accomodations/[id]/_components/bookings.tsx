import { DangerModalActionIcon } from "@/components/danger-modal-action-icon";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { MantineTable } from "@/components/mantine-table";
import { bookingStatus, tableColumnProps } from "@/constants";
import { useActionNotification } from "@/hooks/use-action-notification";
import { convertDate } from "@/utils";
import {
  AccomodationProps,
  cancelBooking,
  confirmBooking,
  deleteBooking,
} from "@accomodations/[id]/_actions";

import { Avatar, Badge, Button, Group, Stack, Text, rem } from "@mantine/core";
import { IconCalendarCancel, IconCheck } from "@tabler/icons-react";
import React from "react";
import { CancelBookingAction } from "@accomodations/[id]/_components/cancel-booking-action";
import { UpdateActionIcon } from "@/components/update-action-icon";
import { ButtonAction } from "@/components/button-action";

export const Bookings = ({
  bookings,
}: {
  bookings: AccomodationProps["bookings"];
}) => {
  return (
    <Stack gap="sm">
      <Text fw={700} size="xl">
        Buchungen
      </Text>
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
            accessor: "user.firstName",
            title: "Vorname",
            ...tableColumnProps,
          },
          {
            accessor: "user.lastName",
            title: "Nachname",
            ...tableColumnProps,
          },
          {
            accessor: "status",
            title: "Status",
            render: ({ status }) => (
              <Badge color={bookingStatus[status].color}>
                {bookingStatus[status].label}
              </Badge>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "date",
            title: "Datum",
            render: ({ date }) => <Text>{convertDate(date)}</Text>,
            ...tableColumnProps,
          },
          {
            accessor: "actions",
            title: "Aktionen",
            width: "0%",
            render: ({ id, status }) => (
              <Stack gap={rem(4)} justify="flex-end">
                {status === "open" && (
                  <>
                    <ButtonAction
                      size="compact-sm"
                      variant="light"
                      label="Buchung bestätigen"
                      action={confirmBooking}
                      values={{ id: id }}
                    >
                      Bestätigen
                    </ButtonAction>
                    <ButtonAction
                      size="compact-sm"
                      variant="light"
                      color="red"
                      label="Buchung löschen"
                      action={deleteBooking}
                      values={{ id: id }}
                    >
                      Löschen
                    </ButtonAction>
                  </>
                )}
                {(status === "confirmed" || status === "request_canceled") && (
                  <>
                    <ButtonAction
                      size="compact-sm"
                      variant="light"
                      color="red"
                      label="Buchung wird storniert"
                      action={cancelBooking}
                      values={{ id: id }}
                    >
                      Buchung stornieren
                    </ButtonAction>
                  </>
                )}
              </Stack>
            ),
            ...tableColumnProps,
          },
        ]}
        storeKey="bookings-table"
      />
    </Stack>
  );
};

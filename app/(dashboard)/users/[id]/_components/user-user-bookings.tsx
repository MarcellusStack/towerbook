import { MantineTable } from "@/components/mantine-table";
import { bookingStatus, tableColumnProps } from "@/constants";
import { convertDate } from "@/utils";
import {
  cancelBooking,
  confirmBooking,
  deleteBooking,
} from "@accomodations/[id]/_actions";
import { SettingsDashboardProps } from "@settings/_actions";
import { Badge, Stack, Text, rem } from "@mantine/core";
import React from "react";
import { ButtonAction } from "@/components/button-action";

export const UserUserBookings = ({
  bookings,
}: {
  bookings: SettingsDashboardProps["bookings"];
}) => {
  return (
    <MantineTable
      records={bookings || []}
      columns={[
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
          accessor: "accomodation.street",
          title: "Straße",
          ...tableColumnProps,
        },
        {
          accessor: "accomodation.zipCode",
          title: "Postleitzahl",
          ...tableColumnProps,
        },
        {
          accessor: "accomodation.location",
          title: "Standort",
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
      storeKey="user-user-bookings-table"
    />
  );
};

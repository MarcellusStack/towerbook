import { MantineTable } from "@/components/mantine-table";
import { bookingStatus, tableColumnProps } from "@/constants";
import { convertDate } from "@/utils";
import { SettingsDashboardProps } from "@settings/_actions";
import { Badge, Group, Text } from "@mantine/core";
import React from "react";
import { RequestCancelBookingForm } from "@/components/user/request-cancel-booking-form";
import { ButtonModalAction } from "@components/button-modal-action";

export const UserBookings = ({
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
            <Group gap={0} justify="flex-end">
              {status === "confirmed" && (
                <ButtonModalAction
                  color="red"
                  size="compact-sm"
                  content={<RequestCancelBookingForm id={id} />}
                >
                  Stornierungsanfrage
                </ButtonModalAction>
              )}
            </Group>
          ),
          ...tableColumnProps,
        },
      ]}
      storeKey="user-bookings-table"
    />
  );
};

import { DangerModalActionIcon } from "@/components/danger-modal-action-icon";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { MantineTable } from "@/components/mantine-table";
import { bookingStatus, tableColumnProps } from "@/constants";
import { convertDate } from "@/utils";
import { deleteUserBooking } from "@accomodations/[id]/_actions";
import { SettingsDashboardProps } from "@settings/_actions";
import { Badge, Group, Text } from "@mantine/core";
import { IconCalendarX } from "@tabler/icons-react";
import React from "react";
import { RequestCancelBookingAction } from "@components/user/request-cancel-booking-action";

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
              {(status === "open" || status === "canceled") && (
                <>
                  <DeleteActionIcon
                    id={id}
                    action={deleteUserBooking}
                    model="Buchung"
                  />
                </>
              )}
              {status === "confirmed" && (
                <DangerModalActionIcon
                  icon={
                    <IconCalendarX
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  }
                  label="Stornierungsanfrage"
                  action={<RequestCancelBookingAction id={id} />}
                />
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

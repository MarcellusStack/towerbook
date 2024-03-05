import { DangerModalActionIcon } from "@/components/danger-modal-action-icon";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { MantineTable } from "@/components/mantine-table";
import { bookingStatus, tableColumnProps } from "@/constants";
import { useActionNotification } from "@/hooks/use-action-notification";
import { convertDate } from "@/utils";
import {
  AccomodationProps,
  confirmBooking,
  deleteBooking,
} from "@accomodations/[id]/_actions";
import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { IconCalendarCancel, IconCheck } from "@tabler/icons-react";
import React from "react";
import { CancelBookingAction } from "@accomodations/[id]/_components/cancel-booking-action";
import { UpdateActionIcon } from "@/components/update-action-icon";

export const Bookings = ({
  bookings,
}: {
  bookings: AccomodationProps["bookings"];
}) => {
  const confirm = useActionNotification({
    action: confirmBooking,
    executeNotification: "Buchung wird bestätigt",
  });

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
              <Group gap={0} justify="flex-end">
                {status === "open" && (
                  <>
                    <UpdateActionIcon
                      icon={
                        <IconCheck
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                        />
                      }
                      label="Buchung bestätigen"
                      action={confirmBooking}
                      values={{ id: id }}
                    />
                    <DeleteActionIcon
                      id={id}
                      action={deleteBooking}
                      model="Buchung"
                    />
                  </>
                )}
                {status === "confirmed" && (
                  <DangerModalActionIcon
                    icon={
                      <IconCalendarCancel
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    }
                    label="Buchung stornieren"
                    action={<CancelBookingAction id={id} />}
                  />
                )}
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

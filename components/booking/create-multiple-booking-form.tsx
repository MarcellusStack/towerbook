"use client";

import React, { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, SegmentedControl, Stack, Text, rem } from "@mantine/core";
import { multipleBookSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { convertDate } from "@/utils";
import { useParams } from "next/navigation";
import { UserMultiSelect } from "@components/user-multiselect";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { createMultipleBooking } from "@accomodations/[id]/_actions";

export const CreateMultipleBookingForm = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const form = useForm({
    name: "create-multiple-booking-form",
    validate: zodResolver(multipleBookSchema),
    initialValues: {
      accomodationId: id,
      startDate: startDate,
      endDate: endDate,
      users: [],
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createMultipleBooking,
    executeNotification: "Buchungen wird erstellt",
    hideModals: true,
  });

  return (
    <Stack gap="md">
      <Text>
        Von {convertDate(startDate)} bis {convertDate(endDate)}
      </Text>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          {
            value: "user",
            label: (
              <Stack gap={0} align="center">
                <IconUser
                  style={{ width: rem(32), height: rem(32) }}
                  stroke={1.5}
                />
                <Text size="lg">Für mich</Text>
              </Stack>
            ),
            disabled: true,
          },
          {
            value: "users",
            label: (
              <Stack gap={0} align="center">
                <IconUsers
                  style={{ width: rem(32), height: rem(32) }}
                  stroke={1.5}
                />
                <Text size="lg">Für Benutzer</Text>
              </Stack>
            ),
          },
        ]}
      />
      {value === "users" && (
        <UserMultiSelect
          formActionId="create-multiple-booking-form"
          formField="users"
          label="Benutzer"
        />
      )}

      <Button
        loading={status === "executing"}
        onClick={() => {
          execute(form.values);
        }}
      >
        Buchen
      </Button>
    </Stack>
  );
};

"use client";

import React, { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, SegmentedControl, Stack, Text } from "@mantine/core";
import { bookSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { convertDate } from "@/utils";
import { createBooking } from "@/server/actions/booking";
import { useParams } from "next/navigation";
import { UserMultiSelect } from "@components/user-multiselect";

export const CreateBookingForm = ({ date }: { date: Date }) => {
  const { id } = useParams();
  const [value, setValue] = useState("user");
  const form = useForm({
    name: "create-booking-form",
    validate: zodResolver(bookSchema),
    initialValues: {
      accomodationId: id,
      date: date,
      users: [],
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createBooking,
    executeNotification: "Buchung wird erstellt",
    hideModals: true,
  });

  return (
    <Stack gap="md">
      <Text>{convertDate(date)}</Text>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          { value: "user", label: "Für mich" },
          { value: "users", label: "Für Benutzer" },
        ]}
      />
      {value === "users" && (
        <UserMultiSelect
          formActionId="create-booking-form"
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

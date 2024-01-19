"use client";
import React from "react";

import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Text } from "@mantine/core";
import { bookSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { convertDate } from "@/utils";
import { createBooking } from "@/server/actions/booking";
import { useParams } from "next/navigation";

export const CreateBookingForm = ({ date }: { date: Date }) => {
  const { id } = useParams();
  const form = useForm({
    validate: zodResolver(bookSchema),
    initialValues: {
      accomodationId: id,
      date: date,
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

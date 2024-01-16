"use client";

import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Modal, Button, TextInput, Text, Stack } from "@mantine/core";
import * as z from "zod";
import { organizationSchema } from "@schemas/index";
import { useActionNotification } from "@hooks/use-action-notification";
import { createOrg } from "@/server/actions/create-organization";

export const CreateOrganizationForm = () => {
  const form = useForm({
    validate: zodResolver(organizationSchema),
    initialValues: {
      name: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: createOrg,
  });
  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="sm">
        <Text c="dimmed" size="sm" mt="sm">
          Erstellen Sie hier eine Organisation um Ihre Türme & Benutzer zu
          verwalten. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind.
        </Text>
        <TextInput
          label="Name der Organisation"
          {...form.getInputProps("name")}
        />

        <Button loading={status === "executing"} type="submit">
          Erstellen
        </Button>
      </Stack>
    </form>
  );
};

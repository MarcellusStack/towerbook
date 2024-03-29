"use client";

import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, TextInput, Text, Stack } from "@mantine/core";
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

  const { execute, status } = useActionNotification({
    action: createOrg,
    redirectUrl: "/dashboard",
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

        <Button variant="filled" loading={status === "executing"} type="submit">
          Erstellen
        </Button>
      </Stack>
    </form>
  );
};

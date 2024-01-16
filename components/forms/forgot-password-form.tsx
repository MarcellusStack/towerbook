"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { forgotPassword } from "@/server/actions/user";
import { z } from "zod";

export const ForgotPasswordForm = () => {
  const form = useForm({
    validate: zodResolver(
      z.object({
        email: z.string().email({
          message: "Keine gültige E-Mail",
        }),
      })
    ),
    initialValues: {
      email: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: forgotPassword,
    executeNotification: "E-Mail wird gesendet",
  });
  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="md">
        <TextInput
          label="E-Mail"
          type="email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <Button variant="filled" loading={status === "executing"} type="submit">
          Passwort vergessen
        </Button>
      </Stack>
    </form>
  );
};

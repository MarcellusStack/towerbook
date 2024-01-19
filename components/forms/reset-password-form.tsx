"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, Button, Stack } from "@mantine/core";
import { resetPasswordSchema } from "@/schemas";
import { useActionNotification } from "@hooks/use-action-notification";
import { resetPassword } from "@/server/actions/user";
import { useSearchParams } from "next/navigation";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const form = useForm({
    validate: zodResolver(resetPasswordSchema),
    initialValues: {
      password: "",
      userId: userId,
      token: token,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: resetPassword,
    executeNotification: "Passwort wird zurückgesetzt",
    redirectUrl: "/sign-in",
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <PasswordInput label="Passwort" {...form.getInputProps("password")} />
        <Button loading={status === "executing"} type="submit">
          Passwort zurücksetzen
        </Button>
      </Stack>
    </form>
  );
};

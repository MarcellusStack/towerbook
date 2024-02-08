"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Anchor } from "@mantine/core";
import { authSchema } from "@/schemas";
import Link from "next/link";
import { login } from "@/services/auth/actions";
import { useActionNotification } from "@/hooks/use-action-notification";

const SignInForm = () => {
  const form = useForm({
    validate: zodResolver(authSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: login,
    executeNotification: "Sie werden angemeldet",
    redirectUrl: "/dashboard",
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <Stack gap="md">
        <TextInput
          label="Email"
          type="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput label="Passwort" {...form.getInputProps("password")} />
        <Button variant="filled" loading={status === "executing"} type="submit">
          Anmelden
        </Button>
        <Button variant="outline" component={Link} href="/sign-up">
          Keinen Account?
        </Button>
        <Anchor
          component={Link}
          href="/forgot-password"
          className="self-center"
        >
          Passwort vergessen?
        </Anchor>
      </Stack>
    </form>
  );
};

export default SignInForm;

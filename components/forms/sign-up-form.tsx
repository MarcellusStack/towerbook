"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Anchor } from "@mantine/core";
import { signUpSchema } from "@/schemas";
import Link from "next/link";
import { signUp } from "@/server/actions/sign-up";
import { useActionNotification } from "@/hooks/use-action-notification";

const SignUpForm = () => {
  const form = useForm({
    validate: zodResolver(signUpSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { execute, result, status } = useActionNotification({
    action: signUp,
    redirectUrl: "/sign-in",
  });
  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="md">
        <TextInput
          label="E-Mail"
          type="email"
          {...form.getInputProps("email")}
        />
        <TextInput label="Vorname" {...form.getInputProps("firstName")} />
        <TextInput label="Nachname" {...form.getInputProps("lastName")} />
        <PasswordInput label="Passwort" {...form.getInputProps("password")} />
        <Button variant="filled" loading={status === "executing"} type="submit">
          Registrieren
        </Button>
        <Anchor component={Link} href="/sign-in" className="self-center">
          Sie haben bereits ein Konto
        </Anchor>
      </Stack>
    </form>
  );
};

export default SignUpForm;

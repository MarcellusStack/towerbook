"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Anchor } from "@mantine/core";
import { signUpSchema } from "@/schemas";
import { useAction } from "next-safe-action/hook";
import Link from "next/link";
import { signUp } from "@/server/actions/sign-up";
import { useActionNotification } from "@/hooks/use-action-notification";
import { useRouter } from "next/navigation";

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
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Vorname"
          placeholder="Vorname"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Nachname"
          placeholder="Nachname"
          {...form.getInputProps("lastName")}
        />
        <PasswordInput
          label="Passwort"
          placeholder="MeinSicheresPasswort123"
          {...form.getInputProps("password")}
        />
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

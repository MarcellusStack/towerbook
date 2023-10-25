"use client";
import React, { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Stack, Anchor } from "@mantine/core";
import { authSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import Link from "next/link";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(authSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setLoading(true);
        signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
            notifications.show({
              id: "success-action-notification",
              autoClose: 5000,
              title: "Fehler",
              message: error,
              color: "red",
            });
          } else {
            router.push("/dashboard");
          }
        });
      })}
    >
      <Stack gap="md">
        <TextInput
          label="Email"
          type="email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Passwort"
          placeholder="MeinSicheresPasswort123"
          {...form.getInputProps("password")}
        />
        <Button variant="filled" loading={loading} type="submit">
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

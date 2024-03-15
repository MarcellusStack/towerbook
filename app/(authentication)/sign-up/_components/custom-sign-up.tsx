"use client";
import React, { useTransition } from "react";
import { useSignUp } from "@clerk/clerk-react";
import {
  Button,
  Paper,
  PasswordInput,
  Skeleton,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { passwordSchema } from "@/schemas";
import { useRouter } from "next/navigation";

export const CustomSignUp = () => {
  const { signUp, isLoaded } = useSignUp();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ticket = searchParams.get("__clerk_ticket");
  const form = useForm({
    validate: zodResolver(passwordSchema),
    initialValues: {
      password: "",
    },
  });
  if (!isLoaded) return <Skeleton w={450} h={550} />;
  return (
    <Paper withBorder p="md" radius="sm">
      <form
        onSubmit={form.onSubmit((values) => {
          startTransition(async () => {
            try {
              notifications.show({
                id: "custom-sign-up",
                withCloseButton: false,
                loading: true,
                withBorder: true,
                autoClose: false,
                title: "Bitte warten, die Aktion wird ausgeführt",
                message: "Sie werden registriert",
                color: "yellow",
              });
              await signUp.create({
                strategy: "ticket",
                ticket,
                password: values.password,
              });
            } catch (error) {
              notifications.hide("custom-sign-up");
              notifications.show({
                id: "error-action-notification",
                withBorder: true,
                autoClose: 5000,
                title: "Fehler",
                message: error,
                color: "red",
              });
            }
            notifications.hide("custom-sign-up");
            notifications.show({
              id: "success-action-notification",
              withBorder: true,
              autoClose: 5000,
              title: "Erfolgreich",
              message: "Sie haben sich registriert",
              color: "green",
            });
          });
        })}
      >
        <Stack gap="sm">
          <Title order={1} size="h2">
            Erstelle deinen Account
          </Title>
          <Text c="dimmed" size="sm">
            weiter zu Turmbuch
          </Text>
          <PasswordInput label="Password" {...form.getInputProps("password")} />
          <Button loading={isPending} fullWidth type="submit">
            Registrieren
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

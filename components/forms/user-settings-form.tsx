"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Text,
  Box,
} from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import {
  deleteAccount,
  leaveOrganization,
  updateEmail,
} from "@/server/actions/user";
import { ModalAction } from "@/components/modal-action";
import { z } from "zod";
import { UserSettingsProps } from "@/server/queries/user";

export const UserSettingsForm = ({ user }: { user: UserSettingsProps }) => {
  const form = useForm({
    validate: zodResolver(
      z.object({
        email: z.string().email({
          message: "Keine gültige E-Mail",
        }),
      })
    ),
    initialValues: {
      email: user.email,
    },
  });

  const updateEmailAction = useActionNotification({
    action: updateEmail,
    executeNotification: `E-Mail wird aktualisiert`,
  });

  const leaveOrganizationAction = useActionNotification({
    action: leaveOrganization,
    executeNotification: `Verlasse Organisation`,
    hideModals: true,
  });

  const deleteAccountAction = useActionNotification({
    action: deleteAccount,
    executeNotification: `Benutzer wird gelöscht`,
    hideModals: true,
  });
  return (
    <Stack gap="md">
      <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
        <Fieldset
          id="update-email"
          legend={
            <Text fw={700} size="xl">
              E-Mail aktualisieren
            </Text>
          }
        >
          <form
            onSubmit={form.onSubmit((values) =>
              updateEmailAction.execute({ email: values.email })
            )}
          >
            <Stack gap="sm">
              <TextInput
                {...form.getInputProps("email")}
                type="email"
                label="E-Mail"
              />
              <Button
                variant="filled"
                type="submit"
                loading={updateEmailAction.status === "executing"}
                className="self-end"
              >
                Aktualisieren
              </Button>
            </Stack>
          </form>
        </Fieldset>
        <Fieldset
          style={{
            borderColor: "var(--mantine-color-red-2)",
          }}
          id="delete-account"
          legend={
            <Text fw={700} size="xl">
              Account löschen
            </Text>
          }
        >
          <Stack gap="sm">
            <Text>
              Entfernen Sie Ihr persönliches Konto und alle dazugehörigen
              Inhalte dauerhaft von der Digitales Turmbuch. Diese Aktion kann
              nicht rückgängig gemacht werden, daher setzen Sie bitte mit
              Vorsicht fort.
            </Text>
            <Box className="self-end">
              <ModalAction
                color="red"
                label="Account löschen"
                content={
                  <Button
                    color="red"
                    loading={deleteAccountAction.status === "executing"}
                    className="self-end"
                    onClick={() => deleteAccountAction.execute({})}
                  >
                    Löschen
                  </Button>
                }
                loading={deleteAccountAction.status === "executing"}
              />
            </Box>
          </Stack>
        </Fieldset>
        <Fieldset
          style={{
            borderColor: "var(--mantine-color-red-2)",
          }}
          id="leave-organization"
          legend={
            <Text fw={700} size="xl">
              Organisation verlassen
            </Text>
          }
        >
          <Stack gap="sm">
            <Text>
              Verlassen Sie die Organisation ihre Persönlichen Daten bleiben
              erhalten. Diese Aktion kann nicht rückgängig gemacht werden, daher
              setzen Sie bitte mit Vorsicht fort.
            </Text>
            <Box className="self-end">
              <ModalAction
                color="red"
                label="Organisation verlassen"
                content={
                  <Button
                    color="red"
                    loading={leaveOrganizationAction.status === "executing"}
                    className="self-end"
                    onClick={() => leaveOrganizationAction.execute({})}
                  >
                    Verlassen
                  </Button>
                }
                loading={leaveOrganizationAction.status === "executing"}
              />
            </Box>
          </Stack>
        </Fieldset>
      </SimpleGrid>
    </Stack>
  );
};

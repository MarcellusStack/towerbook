"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Select,
  Text,
  NumberInput,
  Checkbox,
  Box,
} from "@mantine/core";
import { accountSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { DatePickerInput } from "@mantine/dates";
import { UserAccountProps } from "@users/[id]/account/_actions";
import { updateUserSettingsAccount } from "@settings/account/_actions";
import { ModalAction } from "@/components/modal-action";
import { deleteAccount, leaveOrganization } from "@/server/actions/user";

export const UserSettingsAccountForm = ({
  user,
}: {
  user: UserAccountProps;
}) => {
  const form = useForm({
    validate: zodResolver(accountSchema),
    initialValues: {
      gender: user.gender,
      firstName: user.firstName,
      lastName: user.lastName,
      salutation: user.salutation,
      title: user.title,
      birthName: user.birthName,
      birthDate: new Date(user.birthDate),
      birthPlace: user.birthPlace,
      street: user.street,
      houseNumber: user.houseNumber,
      zipCode: user.zipCode,
      location: user.location,
      phone: user.phone,
      drkMember: user.drkMember,
      drkMemberLocation: user.drkMemberLocation,
      emergencyContactLastName: user.emergencyContactLastName,
      emergencyContactFirstName: user.emergencyContactFirstName,
      emergencyContactPhone: user.emergencyContactPhone,
      bankName: user.bankName,
      iban: user.iban,
      bic: user.bic,
      differentBankholder: user.differentBankholder,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserSettingsAccount,
    executeNotification: `Benutzer wird aktualisiert`,
  });

  const leaveOrganizationAction = useActionNotification({
    action: leaveOrganization,
    executeNotification: `Verlasse Organisation`,
    hideModals: true,
    redirectUrl: "/organization",
  });

  return (
    <Stack gap="sm">
      <form onSubmit={form.onSubmit((values) => execute(values))}>
        <Stack gap="md">
          <Fieldset
            id="base-data"
            legend={
              <Text fw={700} size="xl">
                Stammdaten
              </Text>
            }
          >
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              <Select
                label="Geschlecht"
                placeholder="Geschlecht"
                data={[
                  { value: "male", label: "Männlich" },
                  { value: "female", label: "Weiblich" },
                  { value: "non-binary", label: "Divers" },
                ]}
                {...form.getInputProps("gender")}
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
              <Select
                label="Anrede"
                placeholder="Anrede"
                data={[
                  { value: "mr", label: "Herr" },
                  { value: "mrs", label: "Frau" },
                  { value: "non-binary", label: "Divers" },
                ]}
                {...form.getInputProps("salutation")}
              />
              <Select
                label="Titel"
                placeholder="Titel"
                data={[
                  { value: "doctor", label: "Dr." },
                  { value: "professor", label: "Prof." },
                ]}
                {...form.getInputProps("title")}
              />
              <TextInput
                label="Geburtsname"
                placeholder="Geburtsname"
                {...form.getInputProps("birthName")}
              />
              <DatePickerInput
                locale="de"
                label="Geburtsdatum"
                valueFormat="DD.MM.YYYY"
                {...form.getInputProps("birthDate")}
              />
              <TextInput
                label="Geburtsort"
                placeholder="Geburtsort"
                {...form.getInputProps("birthPlace")}
              />
              <TextInput
                label="Straße"
                placeholder="Straße"
                {...form.getInputProps("street")}
              />
              <TextInput
                label="Hausnummer"
                placeholder="Hausnummer"
                {...form.getInputProps("houseNumber")}
              />
              <TextInput
                label="Postleitzahl"
                placeholder="Postleitzahl"
                {...form.getInputProps("zipCode")}
              />
              <TextInput
                label="Ort"
                placeholder="Ort"
                {...form.getInputProps("location")}
              />
              <TextInput
                label="Handynummer"
                type="tel"
                placeholder="Handynummer"
                {...form.getInputProps("phone")}
              />
              <Checkbox
                label="DRK Mitgliedschaft"
                className="flex items-center"
                {...form.getInputProps("drkMember", { type: "checkbox" })}
              />
              <TextInput
                label="DRK Ortsverein"
                type="tel"
                placeholder="DRK Ortsverein"
                {...form.getInputProps("drkMemberLocation")}
              />
            </SimpleGrid>
          </Fieldset>
          <Fieldset
            id="emergency-contact"
            legend={
              <Text fw={700} size="xl">
                Notfallkontakt
              </Text>
            }
          >
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              <TextInput
                label="Vorname"
                placeholder="Vorname"
                {...form.getInputProps("emergencyContactLastName")}
              />
              <TextInput
                label="Nachname"
                placeholder="Nachname"
                {...form.getInputProps("emergencyContactFirstName")}
              />
              <TextInput
                label="Handynummer"
                placeholder="Handynummer"
                {...form.getInputProps("emergencyContactPhone")}
              />
            </SimpleGrid>
          </Fieldset>
          <Fieldset
            id="bank-details"
            legend={
              <Text fw={700} size="xl">
                Bankverbindung
              </Text>
            }
          >
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              <TextInput
                label="Name der Bank"
                placeholder="Name der Bank"
                {...form.getInputProps("bankName")}
              />
              <TextInput
                label="IBAN"
                placeholder="IBAN"
                {...form.getInputProps("iban")}
              />
              <TextInput
                label="BIC"
                placeholder="BIC"
                {...form.getInputProps("bic")}
              />
              <TextInput
                label="Abweichender Kontoinhaber"
                placeholder="Abweichender Kontoinhaber"
                {...form.getInputProps("differentBankholder")}
              />
            </SimpleGrid>
          </Fieldset>

          <Button
            loading={status === "executing"}
            type="submit"
            className="self-start"
          >
            Speichern
          </Button>
        </Stack>
      </form>
      <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
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

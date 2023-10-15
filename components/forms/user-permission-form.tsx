"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Stack,
  Anchor,
  Fieldset,
  SimpleGrid,
  FileInput,
  Select,
  Text,
  NumberInput,
  Checkbox,
  MultiSelect,
  Group,
  ActionIcon,
  Collapse,
} from "@mantine/core";
import { authSchema, userPermissionsSchema } from "@/schemas";
import { useAction } from "next-safe-action/hook";
import Link from "next/link";
import { signUp } from "@server/actions/sign-up";
import { useActionNotification } from "@/hooks/use-action-notification";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";
import { useDisclosure } from "@mantine/hooks";

import { type Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import { updateUserPermissions } from "@/server/actions/update-user-permission";
import { IconSelector, IconSwitchVertical } from "@tabler/icons-react";

export const UserPermissionsForm = ({ user }: { user: Profile }) => {
  const form = useForm({
    validate: zodResolver(userPermissionsSchema),
    initialValues: {
      role: user.role,
      towers: user.towers,
      userId: user.userId,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserPermissions,
    executeNotification: `Benutzer ${user.firstName} ${user.lastName} wird aktualisiert`,
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        execute({ ...values, userId: user.userId })
      )}
    >
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Berechtigungen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <MultiSelect
              label="Rolle"
              data={roles}
              {...form.getInputProps("role")}
            />
            <MultiSelect
              label="Turm"
              data={roles}
              {...form.getInputProps("towers")}
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
  );
};

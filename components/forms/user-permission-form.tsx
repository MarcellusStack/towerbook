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
import { type Tower } from "@prisma/client";
import { capitalizeFirstLetter } from "@/utils";
import { UserPermissionProps } from "@/server/queries/get-user-permission";

export const UserPermissionForm = ({
  user,
  towers,
}: {
  user: UserPermissionProps;
  towers: Tower[];
}) => {
  const form = useForm({
    validate: zodResolver(userPermissionsSchema),
    initialValues: {
      role: user.role,
      towers: user.towers.map((tower) => tower.id),
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
              data={towers.map((tower) => ({
                value: tower.id,
                label: `${capitalizeFirstLetter(tower.type)} ${
                  tower.number
                } - ${tower.name}`,
              }))}
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

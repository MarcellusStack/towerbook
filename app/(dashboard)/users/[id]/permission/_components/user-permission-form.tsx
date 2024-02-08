"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Text,
  MultiSelect,
} from "@mantine/core";
import { userPermissionsSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { roles } from "@/constants/roles";
import { updateUserPermissions } from "@/server/actions/update-user-permission";
import { UserPermissionProps } from "@users/[id]/permission/_actions";

export const UserPermissionForm = ({ user }: { user: UserPermissionProps }) => {
  const form = useForm({
    validate: zodResolver(userPermissionsSchema),
    initialValues: {
      role: user.role,
      towers: user.towers.map((tower) => tower.id),
      userId: user.id,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserPermissions,
    executeNotification: `Benutzer wird aktualisiert`,
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        execute({ ...values, userId: user.id })
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
            {/* <MultiSelect
              label="Turm"
              data={towers.map((tower) => ({
                value: tower.id,
                label: `${capitalizeFirstLetter(tower.type)} ${
                  tower.number
                } - ${tower.name}`,
              }))}
              {...form.getInputProps("towers")}
            /> */}
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

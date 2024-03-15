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
  Grid,
} from "@mantine/core";
import { userPermissionsSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { roles } from "@/constants/roles";
import { updateUserPermissions } from "@/server/actions/update-user-permission";
import { UserPermissionProps } from "@users/[id]/permission/_actions";
import { PermissionMultiSelect } from "@/components/permission-multiselect";

export const UserPermissionForm = ({ user }: { user: UserPermissionProps }) => {
  const form = useForm({
    name: "user-permission-form",
    validate: zodResolver(userPermissionsSchema),
    initialValues: {
      permissions: user.permissions,
      towers: user.towers,
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
          <Grid gutter="sm">
            <Grid.Col span={3}>
              <PermissionMultiSelect
                formActionId="user-permission-form"
                formField="permissions"
                label="Berechtigungen"
                initialValue={user.permissions}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>
        <Button
          /* loading={status === "executing"}
          type="submit" */
          onClick={() => {
            console.log(form.values);
          }}
          className="self-start"
        >
          Speichern
        </Button>
      </Stack>
    </form>
  );
};

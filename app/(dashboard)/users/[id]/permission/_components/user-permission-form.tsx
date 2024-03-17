"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Fieldset, Text, Grid } from "@mantine/core";
import { userPermissionsSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateUserPermissions } from "@users/[id]/permission/_actions";
import { UserPermissionProps } from "@users/[id]/permission/_actions";
import { PermissionMultiSelect } from "@/components/permission-multiselect";

export const UserPermissionForm = ({ user }: { user: UserPermissionProps }) => {
  const form = useForm({
    name: "user-permission-form",
    validate: zodResolver(userPermissionsSchema),
    initialValues: {
      permissions: user.permissions,
      /* towers: user.towers, */
      id: user.id,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserPermissions,
    executeNotification: `Benutzer wird aktualisiert`,
  });
  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
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

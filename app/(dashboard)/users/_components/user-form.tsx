"use client";
import React, { useState } from "react";
import { Text, Stack, SegmentedControl, rem } from "@mantine/core";
import { CreateOrganizationForm } from "@components/forms/create-organization-form";
import { IconUserPlus, IconUserUp } from "@tabler/icons-react";
import { InviteUserForm } from "@user/_components/invite-user-form";
import { CreateUserForm } from "@users/_components/create-user-form";

export const UserForm = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <SegmentedControl
        fullWidth
        color="blue"
        value={value}
        onChange={setValue}
        data={[
          {
            label: (
              <Stack gap={0} align="center">
                <IconUserPlus style={{ width: rem(32), height: rem(32) }} />
                <Text size="lg">Benutzer Erstellen</Text>
              </Stack>
            ),
            value: "create",
          },
          {
            label: (
              <Stack gap={0} align="center">
                <IconUserUp style={{ width: rem(32), height: rem(32) }} />
                <Text size="lg">Benutzer Einladen</Text>
              </Stack>
            ),
            value: "invite",
          },
        ]}
      />
      {value === "create" && <CreateUserForm />}
      {value === "invite" && <InviteUserForm />}
    </>
  );
};

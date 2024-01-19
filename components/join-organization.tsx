"use client";
import React, { useState } from "react";
import { Modal, Text, Stack, SegmentedControl, rem } from "@mantine/core";
import { CreateOrganizationForm } from "@components/forms/create-organization-form";
import { IconHomeMove, IconHomePlus } from "@tabler/icons-react";
import { Invitations } from "@components/invitations";

export const JoinOrganization = () => {
  const [value, setValue] = useState("");
  return (
    <Modal
      onClose={() => {
        return;
      }}
      withCloseButton={false}
      opened={true}
      size="md"
      title="Organisation beitreten"
    >
      <SegmentedControl
        fullWidth
        color="blue"
        value={value}
        onChange={setValue}
        data={[
          {
            label: (
              <Stack gap={0} align="center">
                <IconHomePlus style={{ width: rem(32), height: rem(32) }} />
                <Text size="lg">Organisation Erstellen</Text>
              </Stack>
            ),
            value: "create",
          },
          {
            label: (
              <Stack gap={0} align="center">
                <IconHomeMove style={{ width: rem(32), height: rem(32) }} />
                <Text size="lg">Einladung annehmen</Text>
              </Stack>
            ),
            value: "invite",
          },
        ]}
      />
      {value === "create" && <CreateOrganizationForm />}
      {value === "invite" && <Invitations />}
    </Modal>
  );
};

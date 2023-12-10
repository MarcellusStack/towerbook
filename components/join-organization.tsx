"use client";

import { useForm, zodResolver } from "@mantine/form";
import {
  Modal,
  Button,
  TextInput,
  Text,
  Stack,
  SegmentedControl,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import * as z from "zod";
import { organizationSchema } from "@schemas/index";
import { useActionNotification } from "@hooks/use-action-notification";
import { createOrg } from "@/server/actions/create-organization";
import { CreateOrganizationForm } from "@components/forms/create-organization-form";
import { IconHome, IconHomeMove, IconHomePlus } from "@tabler/icons-react";
import { Invitations } from "@components/invitations";

export const JoinOrganization = () => {
  const [value, setValue] = useState("");
  return (
    <Modal opened={true} size="md" title="Organisation beitreten">
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

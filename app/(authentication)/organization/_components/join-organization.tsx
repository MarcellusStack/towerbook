"use client";
import React, { useState } from "react";
import { Text, Stack, SegmentedControl, rem } from "@mantine/core";
import { CreateOrganizationForm } from "@components/forms/create-organization-form";
import { IconHomeMove, IconHomePlus } from "@tabler/icons-react";
import { Invitations } from "@components/invitations";
import { TableLoader } from "@/components/loader/table-loader";
import { useGetInvitations } from "@organization/_data";

export const JoinOrganization = () => {
  const [value, setValue] = useState("");

  const { data: invitations, isPending } = useGetInvitations();

  if (isPending || !invitations) return <TableLoader />;
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
                <IconHomePlus
                  style={{ width: rem(32), height: rem(32) }}
                  stroke={1.5}
                />
                <Text size="lg">Organisation Erstellen</Text>
              </Stack>
            ),
            value: "create",
            disabled: invitations.length > 0 ? true : false,
          },
          {
            label: (
              <Stack gap={0} align="center">
                <IconHomeMove
                  style={{ width: rem(32), height: rem(32) }}
                  stroke={1.5}
                />
                <Text size="lg">Einladung annehmen</Text>
              </Stack>
            ),
            value: "invite",
          },
        ]}
      />
      {value === "create" && <CreateOrganizationForm />}
      {value === "invite" && <Invitations />}
    </>
  );
};

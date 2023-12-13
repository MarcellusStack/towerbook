"use client";
import { useActionNotification } from "@/hooks/use-action-notification";
import { acceptInvite } from "@/server/actions/accept-invite";
import { getUserInvitations } from "@/server/actions/get-user-invitations";
import { InvitationExtendedProps } from "@/server/queries/get-invitations";
import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import React, { useEffect } from "react";

export const Invite = ({ props }: { props: InvitationExtendedProps }) => {
  const { execute, result, status } = useActionNotification({
    action: acceptInvite,
    executeNotification: `Einladung wird akzeptiert`,
  });
  return (
    <Card key={props.id} padding="xs" withBorder>
      <Group justify="space-between">
        <Avatar color="blue" radius="xl" className="uppercase">
          {props.organization.name.charAt(0)}
          {props.organization.name.charAt(props.organization.name.length - 1)}
        </Avatar>
        <Text>{props.organization.name}</Text>
        <ActionIcon
          loading={status === "executing"}
          variant="subtle"
          color="green"
          onClick={() => {
            execute({ id: props.id });
          }}
        >
          <IconCheck style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export const Invitations = () => {
  const { execute, result, status } = useActionNotification({
    action: getUserInvitations,
    executeNotification: `Einladungen werden geladen`,
  });

  useEffect(() => {
    execute({});
  }, []);

  return (
    <Stack gap="sm" mt="md">
      {status === "executing" && <Skeleton w="100%" h={350} />}
      {result.data &&
        result.data.invitations.map((invitation: InvitationExtendedProps) => (
          <Invite key={invitation.id} props={invitation} />
        ))}
    </Stack>
  );
};
"use client";
import { ActionIcon, Avatar, Card, Group, Text, rem } from "@mantine/core";
import { createFormActions } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export type UserFormCardProps = {
  id: string;
  firstName: string;
  lastName: string;
};

export const UserFormCard = ({
  props,
  index,
  formField,
  formActionId,
}: {
  props: UserFormCardProps;
  index: number;
  formField: string;
  formActionId: string;
}) => {
  const form = createFormActions(formActionId);
  return (
    <Card key={`${props.id}-${index}`} padding="xs" withBorder>
      <Group justify="space-between">
        <Avatar color="blue" radius="xl">
          {props.firstName?.charAt(0)}
          {props.lastName?.charAt(0)}
        </Avatar>
        <Group gap={rem(4)}>
          <Text>{props.firstName}</Text>
          <Text>{props.lastName}</Text>
        </Group>
        <ActionIcon
          onClick={() => {
            form.removeListItem(formField, index);
          }}
          variant="subtle"
          color="red"
        >
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

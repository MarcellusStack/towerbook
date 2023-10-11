"use client";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export type UsersTableProps = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
  birthDate: string;
};

export function UsersTable({ users }: { users: UsersTableProps[] }) {
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Vorname</Table.Th>
          <Table.Th>E-Mail</Table.Th>
          <Table.Th>Rolle</Table.Th>
          <Table.Th>Geburtsdatum</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.userId}>
            <Table.Td>
              <Text size="sm">{user.firstName}</Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{user.lastName}</Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{user.email}</Text>
            </Table.Td>
            <Table.Td>
              {user.role.map((role) => (
                <Badge color="blue" variant="light">
                  {role}
                </Badge>
              ))}
            </Table.Td>
            <Table.Td>
              <Text size="sm">{user.birthDate}</Text>
            </Table.Td>
            <Table.Td>
              <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle">
                  <IconPencil
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red">
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

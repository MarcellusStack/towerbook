"use client";
import { roles } from "@/constants/roles";
import { Badge, Table, Group, Text, ActionIcon, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { DeleteUserAction } from "@components/delete-user-action";
import Link from "next/link";
import { convertDate } from "@utils/index";

export type UsersTableProps = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
  birthDate: string;
};

export const UserTableRow = ({ user }: { user: UsersTableProps }) => {
  return (
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
        <Group gap="xs">
          {user.role.map((role) => (
            <Badge color={roles.filter((r) => r.value === role)[0].color}>
              {roles.filter((r) => r.value === role)[0].label}
            </Badge>
          ))}
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{convertDate(user.birthDate)}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            component={Link}
            href={`/users/${user.userId}`}
            variant="subtle"
          >
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Benutzer löschen",

                children: (
                  <>
                    <DeleteUserAction userId={user.userId} />
                  </>
                ),
              });
            }}
            variant="subtle"
            color="red"
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
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
          <UserTableRow user={user} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

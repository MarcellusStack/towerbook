"use client";

import { Table, Group, Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { convertDate } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteUser } from "@users/_actions";

export const UserTableRow = ({ user }: { user: UserTableProps }) => {
  return (
    <Table.Tr>
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
        <Text size="sm">{convertDate(new Date(user.birthDate))}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            component={Link}
            href={`/users/${user.id}`}
            variant="subtle"
          >
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Benutzer löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={user.id}
                      action={deleteUser}
                      model="Benutzer"
                    />
                  </>
                ),
              });
            }}
            variant="subtle"
            color="red"
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export function UsersTable({ users }: { users: UserTableProps[] }) {
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Vorname</Table.Th>
          <Table.Th>E-Mail</Table.Th>
          <Table.Th>Geburtsdatum</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

"use client";

import { roles } from "@/constants/roles";
import { Badge, Table, Group, Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { DeleteModalAction } from "../delete-modal-action";
import { InvitationProps } from "@server/queries/get-invitations";
import { deleteInvitation } from "@/server/actions/delete-invitation";

export const UserInvitationTableRow = ({
  invitation,
}: {
  invitation: InvitationProps;
}) => {
  return (
    <Table.Tr key={invitation.id}>
      <Table.Td>
        <Text size="sm">{invitation.email}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Badge
            color={roles.filter((r) => r.value === invitation.role)[0].color}
          >
            {roles.filter((r) => r.value === invitation.role)[0].label}
          </Badge>
        </Group>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          onClick={() => {
            modals.open({
              title: "Einladung löschen",
              children: (
                <>
                  <DeleteModalAction
                    id={invitation.id}
                    action={deleteInvitation}
                    model="Einladung"
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
      </Table.Td>
    </Table.Tr>
  );
};

export function UserInvitationsTable({
  invitations,
}: {
  invitations: InvitationProps[];
}) {
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>E-Mail</Table.Th>
          <Table.Th>Rolle</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {invitations.map((invitation) => (
          <UserInvitationTableRow invitation={invitation} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

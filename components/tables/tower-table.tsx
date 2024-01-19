"use client";
import { Table, Group, Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteTower } from "@server/actions/delete-tower";
import { TowerProps, TowersProps } from "@/server/queries/get-towers";

export const TowerTableRow = ({ tower }: { tower: TowerProps }) => {
  return (
    <Table.Tr key={tower.id}>
      <Table.Td>
        {tower.type === "tower" && (
          <Image
            src="/tower.png"
            width={28}
            height={28}
            style={{ opacity: 0.8 }}
            alt="type icon"
          />
        )}
        {tower.type === "quad" && (
          <Image
            src="/quad.png"
            width={28}
            height={28}
            style={{ opacity: 0.8 }}
            alt="type icon"
          />
        )}
      </Table.Td>
      <Table.Td>
        <Image
          src={`/${tower.status}.jpg`}
          alt="status"
          width={32}
          height={32}
        />
      </Table.Td>
      <Table.Td>
        <Text size="sm">{tower.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{tower.number}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{tower.location}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            component={Link}
            href={`/towers/${tower.id}`}
            variant="subtle"
          >
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Turm löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={tower.id}
                      action={deleteTower}
                      model="Turm"
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

export function TowerTable({ towers }: { towers: TowersProps }) {
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Typ</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Turmnummer</Table.Th>
          <Table.Th>Standort</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {towers.map((tower) => (
          <TowerTableRow tower={tower} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

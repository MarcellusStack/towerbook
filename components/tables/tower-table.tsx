"use client";
import { roles } from "@/constants/roles";
import { Badge, Table, Group, Text, ActionIcon, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { capitalizeFirstLetter, convertDate } from "@utils/index";
import Image from "next/image";
import { DeleteTowerAction } from "@components/delete-tower-action";

export type TowerProps = {
  id: string;
  type: "tower" | "quad";
  status: "operation" | "inactive" | "active";
  name: string;
  number: string;
  location: string;
};

const statusColors = {
  operation: "blue",
  inactive: "red",
  active: "green",
};

const typeDescription = {
  tower: "Turm",
  quad: "Quad",
};

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
        <Badge color={statusColors[tower.status]}>
          {capitalizeFirstLetter(tower.status)}
        </Badge>
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
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Turm löschen",
                children: (
                  <>
                    <DeleteTowerAction id={tower.id} />
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

export function TowerTable({ towers }: { towers: TowerProps[] }) {
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

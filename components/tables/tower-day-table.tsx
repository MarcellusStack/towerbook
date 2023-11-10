"use client";
import { roles } from "@/constants/roles";
import { Badge, Table, Group, Text, ActionIcon, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { capitalizeFirstLetter, convertDate, convertTime } from "@utils/index";
import Image from "next/image";
import { DeleteModalAction } from "@components/delete-modal-action";
import { type TowerDayStatus } from "@prisma/client";
import { deleteTowerDay } from "@/server/actions/delete-tower-day";

export type TowerDayProps = {
  id: string;
  createdAt: Date;
  startedAt: Date;
  status: TowerDayStatus;
  guardLeader: { firstName: string; lastName: string };
  towerLeader: { firstName: string; lastName: string };
};

const statusColors = {
  open: "red",
  ongoing: "yellow",
  completed: "green",
};

export const TowerDayTableRow = ({ towerday }: { towerday: TowerDayProps }) => {
  return (
    <Table.Tr key={towerday.id}>
      <Table.Td>
        <Text size="sm">{convertDate(new Date(towerday.createdAt))}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{convertTime(new Date(towerday.startedAt))}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={statusColors[towerday.status]}>{towerday.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {towerday.guardLeader.firstName} {towerday.guardLeader.lastName}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {towerday.towerLeader.firstName} {towerday.towerLeader.lastName}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            component={Link}
            href={`/tower-days/${towerday.id}`}
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
                title: "Turm Tag löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={towerday.id}
                      action={deleteTowerDay}
                      model="Turm Tag"
                    />
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

export function TowerDayTable({ towerdays }: { towerdays: TowerDayProps[] }) {
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Datum</Table.Th>
          <Table.Th>Zeit</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Wachleiter</Table.Th>
          <Table.Th>Turmleiter</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {towerdays.map((day) => (
          <TowerDayTableRow towerday={day} />
        ))}
      </Table.Tbody>
    </Table>
  );
}

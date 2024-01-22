"use client";
import { Badge, Table, Group, Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteTowerDay } from "@/server/actions/delete-tower-day";
import { status } from "@/constants";
import { type TowerDaysProps } from "@/server/queries/tower-days";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetTowerDays } from "@/data/towerdays";

export const TowerDayTableRow = ({
  towerday,
}: {
  towerday: TowerDaysProps[0];
}) => {
  return (
    <Table.Tr>
      <Table.Td>
        <Text size="sm">{convertDate(new Date(towerday.createdAt))}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{convertTime(new Date(towerday.startedAt))}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={status[towerday.status].color}>
          {status[towerday.status].label}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          Turm {towerday.tower.number} {towerday.tower.location}
        </Text>
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
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
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
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export function TowerDaysTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: towerdays, isPending } = useGetTowerDays(search as string);

  if (isPending) return <TableLoader />;
  return (
    <Table verticalSpacing="sm" striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Datum</Table.Th>
          <Table.Th>Zeit</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Turm</Table.Th>
          <Table.Th>Wachleiter</Table.Th>
          <Table.Th>Turmleiter</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {towerdays &&
          towerdays.map((day) => <TowerDayTableRow towerday={day} />)}
      </Table.Tbody>
    </Table>
  );
}

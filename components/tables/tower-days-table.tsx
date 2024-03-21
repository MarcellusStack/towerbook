"use client";
import { Badge, Table, Group, Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteTowerDay } from "@/server/actions/delete-tower-day";
import { status as globalStatus, tableColumnProps } from "@/constants";
import { type TowerDaysProps } from "@/server/queries/tower-days";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetTowerdays } from "@/data/towerdays";
import { MantineTable } from "@components/mantine-table";
import { ViewActionIcon } from "../view-action-icon";
import { DeleteActionIcon } from "../delete-action-icon";

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
  const { data: towerdays, isPending } = useGetTowerdays(search as string);

  if (isPending) return <TableLoader />;
  return (
    <>
      <MantineTable
        records={towerdays || []}
        columns={[
          {
            accessor: "createdAt",
            title: "Datum",
            render: ({ createdAt }) => <>{convertDate(new Date(createdAt))}</>,
            ...tableColumnProps,
          },
          {
            accessor: "startedAt",
            title: "Zeit",
            render: ({ startedAt }) => <>{convertTime(new Date(startedAt))}</>,
            ...tableColumnProps,
          },
          {
            accessor: "status",
            title: "Status",
            render: ({ status }) => (
              <Badge color={globalStatus[status].color}>
                {globalStatus[status].label}
              </Badge>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "tower",
            title: "Turm",
            render: ({ tower }) => (
              <>
                Turm {tower.number} {tower.location}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "guardLeader",
            title: "Wachleiter",
            render: ({ guardLeader }) => (
              <>
                {guardLeader.firstName} {guardLeader.lastName}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "towerLeader",
            title: "Turmleiter",
            render: ({ towerLeader }) => (
              <>
                {towerLeader.firstName} {towerLeader.lastName}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "actions",
            title: "Aktionen",
            width: "0%",
            render: (towerdays) => (
              <Group gap={0} justify="flex-end">
                <ViewActionIcon href={`/tower-days/${towerdays.id}`} />

                <DeleteActionIcon
                  id={towerdays.id}
                  action={deleteTowerDay}
                  model="Turm"
                />
              </Group>
            ),
            ...tableColumnProps,
          },
        ]}
        storeKey="towerdays-table"
      />
    </>
  );
}

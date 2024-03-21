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

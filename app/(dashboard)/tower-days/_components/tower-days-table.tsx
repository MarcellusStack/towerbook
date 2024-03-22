"use client";
import { Badge, Group } from "@mantine/core";
import { convertDate, convertTime } from "@utils/index";
import { deleteTowerDay } from "@/server/actions/delete-tower-day";
import { status as globalStatus, tableColumnProps } from "@/constants";
import { MantineTable } from "@components/mantine-table";
import { ViewActionIcon } from "@components/view-action-icon";
import { DeleteActionIcon } from "@components/delete-action-icon";
import { TowerDaysProps } from "@/server/queries/tower-days";
import { DatePickerInput, type DatesRangeValue } from "@mantine/dates";
import { useState } from "react";
import { DateInputFilter } from "@/app/(dashboard)/tower-days/_components/dateinput-filter";
import { useSearchParams } from "next/navigation";

export const TowerdaysTable = ({
  towerdays,
}: {
  towerdays: TowerDaysProps;
}) => {
  const searchParams = useSearchParams();

  const date = searchParams.get("createdAt");

  console.log(date);
  return (
    <>
      <MantineTable
        records={towerdays || []}
        columns={[
          {
            accessor: "createdAt",
            title: "Datum",
            render: ({ createdAt }) => <>{convertDate(new Date(createdAt))}</>,
            filter: () => <DateInputFilter />,
            /* filtering: Boolean(birthdaySearchRange), */
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
                {tower.number} {tower.location}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "tower.location",
            title: "Standort",
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
};

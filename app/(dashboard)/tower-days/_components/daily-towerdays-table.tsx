"use client";
import { ButtonAction } from "@/components/button-action";
import { ButtonModalAction } from "@/components/button-modal-action";
import { DashboardCard } from "@/components/dashboard-card";
import { Process } from "@/components/process";
import { Badge, Stack, rem } from "@mantine/core";
import { IconBroadcast, IconChecklist } from "@tabler/icons-react";
import React from "react";
import { completeTowerDays } from "@towerdays/_actions";
import { TowerDaysProps } from "@/server/queries/tower-days";
import { status as globalStatus, tableColumnProps } from "@/constants";
import { MantineTable } from "@/components/mantine-table";
import "dayjs/locale/de";

import { convertDate } from "@/utils";

export const DailyTowerdaysTable = ({
  towerdays,
}: {
  towerdays: TowerDaysProps;
}) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set the time to 00:00:00

  const filteredTowerdays = (towerdays || []).filter((towerday) => {
    const towerdayDate = new Date(towerday.createdAt);
    towerdayDate.setHours(0, 0, 0, 0); // set the time to 00:00:00
    return towerdayDate.getTime() === currentDate.getTime();
  });
  return (
    <>
      <DashboardCard
        title={`Tägliche Turmtage vom ${convertDate(new Date())}`}
        icon={<IconBroadcast size={28} stroke={1.5} />}
      >
        <Stack gap="sm">
          <MantineTable
            records={filteredTowerdays || []}
            columns={[
              {
                accessor: "tower",
                title: "Turm",
                render: ({ tower }) => (
                  <>
                    {tower.name} {tower.number}
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
                accessor: "watchmanStatus",
                title: "Team",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.watchmanStatus}
                      href={`/tower-days/${towerday.id}/watchman-plan`}
                      title="Team"
                      form="watchmanStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "todoStatus",
                title: "Todo",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.todoStatus}
                      href={`/tower-days/${towerday.id}/todo`}
                      title="Todo"
                      form="todoStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "incidentStatus",
                title: "Vorkommnisse",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.incidentStatus}
                      href={`/tower-days/${towerday.id}/incident`}
                      title="Vorkommnisse"
                      form="incidentStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "weatherStatus",
                title: "Wetter",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.weatherStatus}
                      href={`/tower-days/${towerday.id}/weather`}
                      title="Wetter"
                      form="weatherStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "materialStatus",
                title: "Material Prüfung",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.materialStatus}
                      href={`/tower-days/${towerday.id}/material`}
                      title="Material Prüfung"
                      form="materialStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "dutyplanStatus",
                title: "Wachplan",
                render: (towerday) => (
                  <>
                    <Process
                      process={towerday.materialStatus}
                      href={`/tower-days/${towerday.id}/material`}
                      title="Wachplan"
                      form="materialStatus"
                      id={towerday.id}
                    />
                  </>
                ),
                ...tableColumnProps,
              },
              {
                accessor: "actions",
                title: "Aktionen",
                width: "0%",
                render: (towerdays) => (
                  <Stack gap={rem(4)}>
                    <ButtonModalAction
                      size="compact-sm"
                      color="orange"
                      content={<p>Test</p>}
                    >
                      Revision Anfragen
                    </ButtonModalAction>
                    <ButtonModalAction
                      size="compact-sm"
                      color="green"
                      content={<p>Test</p>}
                    >
                      Turmtag abschließen
                    </ButtonModalAction>
                  </Stack>
                ),
                ...tableColumnProps,
              },
            ]}
            storeKey="daily-towerdays-table"
          />
          <ButtonModalAction
            className="self-end"
            color="green"
            leftSection={<IconChecklist />}
            content={
              <ButtonAction
                label="Aktion wird ausgeführt"
                action={completeTowerDays}
                values={{
                  ids: filteredTowerdays.map((towerday) => towerday.id),
                }}
              >
                Alle Turmtage abschließen
              </ButtonAction>
            }
          >
            Alle Turmtage abschließen
          </ButtonModalAction>
        </Stack>
      </DashboardCard>
    </>
  );
};

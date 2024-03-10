"use client";

import React from "react";
import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateTowerStatus } from "@/server/queries/tower";
import { tableColumnProps, towerStatus } from "@/constants";
import { useParams } from "next/navigation";
import { useGetTower } from "@data/tower";
import { TowerStatus } from "@towers/_components/tower-status";
import {
  IconBroadcast,
  IconBroadcastOff,
  IconCheck,
  IconPlus,
  IconUserSearch,
  IconX,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";
import { DashboardLoader } from "@components/loader/dashboard-loader";
import { DashboardCard } from "@components/dashboard-card";
import { ViewActionIcon } from "@components/view-action-icon";
import { MantineTable } from "@components/mantine-table";
import { status as searchlistStatus } from "@/constants";
import { convertDate, convertTime } from "@/utils";

export const TowerDashboard = () => {
  const { execute, result, status } = useActionNotification({
    action: updateTowerStatus,
    executeNotification: `Turm Status wird aktualisiert`,
  });
  const { id } = useParams();
  const { data: tower, isPending } = useGetTower(id as string);

  if (isPending || !tower) return <DashboardLoader />;

  return (
    <>
      <Grid gutter="sm">
        <Grid.Col span={3}>
          <DashboardCard
            title="Status"
            icon={<TowerStatus status={tower.status} />}
          >
            <Stack gap="sm">
              <Text c="dimmed">
                Hier können sie den Status des Turms anpassen.
              </Text>
              <Select
                disabled={status === "executing"}
                data={towerStatus}
                value={tower.status}
                onChange={(value: string | null) =>
                  execute({ id: tower.id, status: value })
                }
              />
            </Stack>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard
            title="Turmtage"
            icon={<IconBroadcast size={28} stroke={1.5} />}
          >
            {tower.main && tower.towerdays.length === 0 && (
              <Stack gap="sm" justify="space-between" h="100%">
                <Stack align="center">
                  <ThemeIcon variant="light" size="xl" color="gray">
                    <IconBroadcastOff style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                  <Text c="dimmed">
                    Keine Turmtage für diesen Tag vorhanden. Erstellen sie hier
                    die benötigten Turmtage für alle Türme.
                  </Text>
                  <Button
                    className="shrink-0 self-stretch"
                    leftSection={<IconPlus size={14} />}
                    onClick={() => {
                      modals.open({
                        title: "Turm Tag anlegen",
                        children: (
                          <>
                            <Text c="dimmed" size="sm" mb="sm">
                              Erstellen Sie hier Turm Tage für Ihre
                              Organisation. Klicken Sie auf 'Hinzufügen', wenn
                              Sie fertig sind.
                            </Text>
                            <CreateTowerDaysForm />
                          </>
                        ),
                      });
                    }}
                  >
                    Hinzufügen
                  </Button>
                </Stack>
              </Stack>
            )}
            {tower.main && tower.towerdays.length > 0 && (
              <Stack gap="sm" align="center">
                <ThemeIcon variant="light" size="xl" color="green">
                  <IconBroadcast style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
                <Text c="dimmed">Turmtage wurden für diesen Tag erstellt.</Text>
              </Stack>
            )}
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard></DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard></DashboardCard>
        </Grid.Col>
        <Grid.Col span={6}>
          <DashboardCard
            title="Aktuelle Personen Suche"
            icon={<IconUserSearch size={28} stroke={1.5} />}
          >
            <MantineTable
              records={tower.searchlists || []}
              columns={[
                {
                  accessor: "status",
                  title: "Status",
                  render: ({ status }) => (
                    <Badge color={searchlistStatus[status].color}>
                      {searchlistStatus[status].label}
                    </Badge>
                  ),
                  ...tableColumnProps,
                },
                {
                  accessor: "timeSearched",
                  title: "Datum",
                  render: ({ timeSearched }) => (
                    <Text>{convertTime(timeSearched)}</Text>
                  ),
                  ...tableColumnProps,
                },
                {
                  accessor: "searchlist",
                  title: "Name",
                  render: ({ firstName, lastName }) => (
                    <Text size="sm">
                      {firstName} {lastName}
                    </Text>
                  ),
                  ...tableColumnProps,
                },
                {
                  accessor: "handOverTo",
                  title: "Übergeben",
                  render: ({ handOverTo }) => {
                    return handOverTo ? (
                      <ThemeIcon color="green" variant="light">
                        <IconCheck style={{ width: "70%", height: "70%" }} />
                      </ThemeIcon>
                    ) : (
                      <ThemeIcon color="red" variant="light">
                        <IconX style={{ width: "70%", height: "70%" }} />
                      </ThemeIcon>
                    );
                  },
                  ...tableColumnProps,
                },
                {
                  accessor: "actions",
                  title: "Aktionen",
                  width: "0%",
                  render: ({ id }) => (
                    <ViewActionIcon href={`/protocols/search-list/${id}`} />
                  ),
                  ...tableColumnProps,
                },
              ]}
              storeKey="tower-search-list-table"
            />
          </DashboardCard>
        </Grid.Col>
      </Grid>
    </>
  );
};

"use client";

import React from "react";
import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Progress,
  RingProgress,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateTowerStatus } from "@/server/queries/tower";
import { tableColumnProps, towerStatus } from "@/constants";
import { useParams } from "next/navigation";
import { useGetTower } from "@data/tower";
import { TowerStatus } from "@towers/_components/tower-status";
import {
  IconAmbulance,
  IconBroadcast,
  IconBroadcastOff,
  IconCalendarPin,
  IconCheck,
  IconFirstAidKit,
  IconPlus,
  IconUserSearch,
  IconWriting,
  IconX,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";
import { DashboardLoader } from "@components/loader/dashboard-loader";
import { DashboardCard } from "@components/dashboard-card";
import { ViewActionIcon } from "@components/view-action-icon";
import { MantineTable } from "@components/mantine-table";
import { status as searchlistStatus } from "@/constants";
import { convertTime } from "@/utils";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import deLocale from "@fullcalendar/core/locales/de";

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
          <DashboardCard
            title="Heutiger Turm Tag Prozess"
            icon={<IconBroadcast size={28} stroke={1.5} />}
          >
            <Stack gap="sm">
              <Text>0 / 6</Text>
              <Progress value={0} size="md" color="blue" radius="xl" />
            </Stack>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard></DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard
            title="Erste-Hilfe-Einsatz(groß)"
            icon={<IconAmbulance size={28} stroke={1.5} />}
          >
            <ScrollArea>
              <Group wrap="nowrap" className="whitespace-nowrap">
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: 0, color: "gray" }]}
                    label={
                      <Text ta="center" size="xs">
                        0
                      </Text>
                    }
                  />
                  <Text>offen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 40,
                        color: "yellow",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        2
                      </Text>
                    }
                  />
                  <Text>in Bearbeitung</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 30,
                        color: "green",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        3
                      </Text>
                    }
                  />
                  <Text>abgeschlossen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "orange",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>in Revision</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "red",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>unvollständig</Text>
                </Stack>
              </Group>
            </ScrollArea>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard
            title="Erste-Hilfe-Einsatz(klein)"
            icon={<IconFirstAidKit size={28} stroke={1.5} />}
          >
            <ScrollArea>
              <Group wrap="nowrap" className="whitespace-nowrap">
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: 0, color: "gray" }]}
                    label={
                      <Text ta="center" size="xs">
                        0
                      </Text>
                    }
                  />
                  <Text>offen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 40,
                        color: "yellow",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        2
                      </Text>
                    }
                  />
                  <Text>in Bearbeitung</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 30,
                        color: "green",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        3
                      </Text>
                    }
                  />
                  <Text>abgeschlossen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "orange",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>in Revision</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "red",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>unvollständig</Text>
                </Stack>
              </Group>
            </ScrollArea>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard
            title="Personen Suchliste"
            icon={<IconUserSearch size={28} stroke={1.5} />}
          >
            <ScrollArea>
              <Group wrap="nowrap" className="whitespace-nowrap">
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: 0, color: "gray" }]}
                    label={
                      <Text ta="center" size="xs">
                        0
                      </Text>
                    }
                  />
                  <Text>offen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 40,
                        color: "yellow",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        2
                      </Text>
                    }
                  />
                  <Text>in Bearbeitung</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 30,
                        color: "green",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        3
                      </Text>
                    }
                  />
                  <Text>abgeschlossen</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "orange",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>in Revision</Text>
                </Stack>
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 70,
                        color: "red",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        7
                      </Text>
                    }
                  />
                  <Text>unvollständig</Text>
                </Stack>
              </Group>
            </ScrollArea>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={3}>
          <DashboardCard
            title="Doku Kinder Gruppen"
            icon={<IconWriting size={28} stroke={1.5} />}
          >
            <ScrollArea>
              <Group wrap="nowrap" className="whitespace-nowrap">
                <Stack gap="0" align="center">
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: 30,
                        color: "green",
                      },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        3
                      </Text>
                    }
                  />
                  <Text>abgeschlossen</Text>
                </Stack>
              </Group>
            </ScrollArea>
          </DashboardCard>
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
        <Grid.Col span={6}>
          <DashboardCard
            title="Aktueller Wachplan"
            icon={<IconCalendarPin size={28} stroke={1.5} />}
          >
            <FullCalendar
              contentHeight="auto"
              locales={[deLocale]}
              plugins={[timeGridPlugin]}
              slotMinTime={"08:00:00"}
              slotMaxTime={"19:00:00"}
              slotDuration={"01:00"}
              initialView="timeGridDay"
              /* events={shifts
                .filter((shift) => shift.type === shiftType)
                .map((filteredShift, index) => ({
                  index: index,
                  id: filteredShift.id,
                  title: `${filteredShift.user.firstName} ${filteredShift.user.lastName}`,
                  start: filteredShift.startTime,
                  end: filteredShift.endTime,
                  color: filteredShift.type === "duty" ? "green" : "gray",
                }))} */
            />
          </DashboardCard>
        </Grid.Col>
      </Grid>
    </>
  );
};

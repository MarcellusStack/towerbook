"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateTowerStatus } from "@/server/queries/tower";
import { towerStatus } from "@/constants";
import { useParams } from "next/navigation";
import { useGetTowerOverview } from "@data/tower";
import { TowerStatus } from "@towers/_components/tower-status";
import { IconBroadcast, IconBroadcastOff, IconPlus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";
import { DashboardLoader } from "@components/loader/dashboard-loader";

export const TowerDashboard = () => {
  const { execute, result, status } = useActionNotification({
    action: updateTowerStatus,
    executeNotification: `Turm Status wird aktualisiert`,
  });
  const { id } = useParams();
  const { data: tower, isPending } = useGetTowerOverview(id as string);

  if (isPending || !tower) return <DashboardLoader />;

  return (
    <>
      <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
        <Card withBorder>
          <Stack gap="sm" justify="space-between" h="100%">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Status
              </Text>
              <TowerStatus status={tower.status} />
            </Group>
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
          </Stack>
        </Card>

        {tower.main && (
          <Card withBorder mah={300}>
            <Stack gap="sm" justify="space-between" h="100%">
              <Group justify="space-between">
                <Text fw={700} size="xl">
                  Turmtage
                </Text>
                <ThemeIcon variant="white" size="lg" color="black">
                  <IconBroadcast
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              </Group>
              {tower.towerdays.length === 0 ? (
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
              ) : (
                <Stack gap="sm" align="center">
                  <ThemeIcon variant="light" size="xl" color="green">
                    <IconBroadcast style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                  <Text c="dimmed">
                    Turmtage wurden für diesen Tag erstellt.
                  </Text>
                </Stack>
              )}
            </Stack>
          </Card>
        )}
      </SimpleGrid>
    </>
  );
};

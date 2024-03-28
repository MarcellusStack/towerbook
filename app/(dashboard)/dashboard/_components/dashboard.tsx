"use client";

import { Box, Card, Flex, Grid, Text, ThemeIcon } from "@mantine/core";
import {
  IconBuildingBroadcastTower,
  IconCheck,
  IconUser,
  IconUserCog,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import { useGetUserDashboard } from "@dashboard/_data";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { DashboardCard } from "@/components/dashboard-card";
import { OnboardingAccordion } from "@dashboard/_components/onboarding-accordion";
import { TowerStatus } from "@towers/_components/tower-status";
import { tableColumnProps } from "@/constants";
import { MantineTable } from "@/components/mantine-table";

export const Dashboard = () => {
  const { data: user, isPending } = useGetUserDashboard();

  if (isPending || !user || !user.organization) return <DashboardLoader />;
  return (
    <Flex direction="row" gap="sm">
      <Grid gutter="sm" flex={1}>
        <Grid.Col span={4}>
          <DashboardCard
            title={`Hallo ${user.firstName} ${user.lastName}`}
            icon={<IconUser size={28} stroke={1.5} />}
          >
            <Text>Es liegt kein geplanter Einsatz vor.</Text>
          </DashboardCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder></Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder></Card>
        </Grid.Col>
        {user.organization.towers.map((tower) => (
          <Grid.Col span={6}>
            <DashboardCard
              title={`${tower.name} ${tower.number} ${tower.location}`}
              icon={<IconBuildingBroadcastTower size={28} stroke={1.5} />}
            >
              <TowerStatus status={tower.status} />
              <MantineTable
                hideColumnsToggle={true}
                height={200}
                minHeightRecords={2}
                records={
                  (tower.towerdays[0] && (tower.towerdays[0].material as [])) ||
                  []
                }
                columns={[
                  {
                    accessor: "image",
                    title: "Bild",
                    render: () => <Box w={32} h={32} bg="gray" />,
                    ...tableColumnProps,
                  },
                  {
                    accessor: "material",
                    title: "Material",
                    ...tableColumnProps,
                  },
                  {
                    accessor: "checked",
                    title: "Einsatzbereit",
                    render: ({ checked }) =>
                      checked ? (
                        <ThemeIcon color="green" variant="light">
                          <IconCheck style={{ width: "70%", height: "70%" }} />
                        </ThemeIcon>
                      ) : (
                        <ThemeIcon color="red" variant="light">
                          <IconX style={{ width: "70%", height: "70%" }} />
                        </ThemeIcon>
                      ),
                    ...tableColumnProps,
                  },
                ]}
                storeKey="towerdays-materials-table"
              />
            </DashboardCard>
          </Grid.Col>
        ))}
      </Grid>
      <OnboardingAccordion
        title="Erste Schritte für Administratoren"
        description="Folgen Sie den Schritten, um ein erfolgreiches Onboarding-Erlebnis
            zu gewährleisten."
        icon={<IconUserCog size={28} stroke={1.5} />}
        steps={[
          {
            value: "Standorte erstellen",
            description:
              "Standorte sind die Orte, an denen Sie Ihre Türme verwalten. Sie können Standorte erstellen, um Ihre Türme, Protokolle und mehr zu gruppieren und die Verwaltung zu vereinfachen. Standorte können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization.towerLocations.length > 0,
            href: "/settings/organization",
            allowLink: true,
          },
          {
            value: "Türme erstellen",
            description:
              "Türme sind die Orte, an denen Sie Ihre Protokolle, Turmtage und mehr verwalten. Sie können Türme erstellen, um Ihre Protokolle, Standorte und mehr zu gruppieren und die Verwaltung zu vereinfachen. Türme können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization.towers.length > 0,
            href: "/towers",
            allowLink: user.organization.towerLocations.length > 0,
          },
          {
            value: "Berechtigungen erstellen",
            description:
              "Berechtigungen sind die Rechte, die Benutzer erhalten. Sie können Berechtigungen erstellen, um Benutzern Zugriff auf Ihre Türme, Protokolle und mehr zu gewähren. Berechtigungen können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization.permissions.length > 1,
            href: "/settings/permissions",
            allowLink: user.organization.towers.length > 0,
          },
          {
            value: "Benutzer erstellen",
            description:
              "Benutzer sind Personen, die an Ihren Türmen, Einsätze durchführen und Turmtage verwalten. Sie können Benutzer erstellen oder einladen, um sie Ihren Türmen zuzuweisen und ihnen Berechtigungen zu erteilen. Benutzer können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization.members.length > 1,
            href: "/users",
            allowLink: user.organization.permissions.length > 1,
          },
        ]}
      />
      {[
        user.organization.towerLocations.length > 0,
        user.organization.towers.length > 0,
        user.organization.permissions.length > 1,
        user.organization.members.length > 1,
      ].every((step) => step) && (
        <OnboardingAccordion
          title="Erste Schritte für Benutzer"
          description="Folgen Sie den Schritten, um ein erfolgreiches Onboarding-Erlebnis
            zu gewährleisten."
          icon={<IconUser size={28} stroke={1.5} />}
          steps={[
            {
              value: "Stammdaten vervollständigen",
              description:
                "Stammdaten sind die grundlegenden Informationen, über die wir verfügen müssen, um Sie zu identifizieren und Ihnen die bestmögliche Erfahrung zu bieten.",
              completed:
                (user.gender &&
                  user.salutation &&
                  user.birthDate &&
                  user.street &&
                  user.houseNumber &&
                  user.zipCode &&
                  user.location &&
                  user.phone) !== null,
              href: "/settings/account",
              allowLink: true,
            },
            {
              value: "Zertifikate hochladen",
              description:
                "Zertifikate sind die Nachweise, die Sie über Ihre Qualifikationen und Fähigkeiten besitzen.",
              completed: user.lifeguardLicense !== null,
              href: "/settings/certificate",
              allowLink:
                (user.gender &&
                  user.salutation &&
                  user.birthDate &&
                  user.street &&
                  user.houseNumber &&
                  user.zipCode &&
                  user.location &&
                  user.phone) !== null,
            },
          ]}
        />
      )}
    </Flex>
  );
};

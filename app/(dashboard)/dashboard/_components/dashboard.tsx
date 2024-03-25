"use client";

import { Card, Flex, Grid, Stack, Text, ThemeIcon } from "@mantine/core";
import {
  IconBed,
  IconSquare,
  IconSquareCheck,
  IconUser,
  IconUserCog,
} from "@tabler/icons-react";
import React from "react";
import { useGetUserDashboard } from "@dashboard/_data";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { UserBookings } from "@/components/user/user-bookings";
import { DashboardCard } from "@/components/dashboard-card";
import { Accordion } from "@mantine/core";
import OnboardingAccordion from "./onboarding-accordion";

export const Dashboard = () => {
  const { data: user, isPending } = useGetUserDashboard();

  if (isPending || !user) return <DashboardLoader />;
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
            completed: user.organization?.towerLocations.length > 0,
            href: "/settings/organization",
            allowLink: true,
          },
          {
            value: "Türme erstellen",
            description:
              "Türme sind die Orte, an denen Sie Ihre Protokolle, Turmtage und mehr verwalten. Sie können Türme erstellen, um Ihre Protokolle, Standorte und mehr zu gruppieren und die Verwaltung zu vereinfachen. Türme können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization?.towers.length > 0,
            href: "/towers",
            allowLink: user.organization?.towerLocations.length > 0,
          },
          {
            value: "Berechtigungen erstellen",
            description:
              "Berechtigungen sind die Rechte, die Benutzer erhalten. Sie können Berechtigungen erstellen, um Benutzern Zugriff auf Ihre Türme, Protokolle und mehr zu gewähren. Berechtigungen können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization?.permissions.length > 1,
            href: "/settings/permissions",
            allowLink: user.organization?.towers.length > 0,
          },
          {
            value: "Benutzer erstellen",
            description:
              "Benutzer sind Personen, die an Ihren Türmen, Einsätze durchführen und Turmtage verwalten. Sie können Benutzer erstellen oder einladen, um sie Ihren Türmen zuzuweisen und ihnen Berechtigungen zu erteilen. Benutzer können nach Bedarf hinzugefügt, bearbeitet oder gelöscht werden.",
            completed: user.organization?.members.length > 1,
            href: "/users",
            allowLink: user.organization?.permissions.length > 1,
          },
        ]}
      />
    </Flex>
  );
};

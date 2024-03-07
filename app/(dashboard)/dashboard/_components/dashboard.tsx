"use client";

import { Card, Grid, Text } from "@mantine/core";
import { IconBed, IconUser } from "@tabler/icons-react";
import React from "react";
import { useGetUserDashboard } from "@dashboard/_data";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { UserBookings } from "@/components/user/user-bookings";
import { DashboardCard } from "@/components/dashboard-card";

export const Dashboard = () => {
  const { data: user, isPending } = useGetUserDashboard();

  if (isPending || !user) return <DashboardLoader />;
  return (
    <Grid gutter="sm">
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
  );
};

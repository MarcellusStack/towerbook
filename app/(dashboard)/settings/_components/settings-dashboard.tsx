"use client";
import { DashboardCard } from "@/components/dashboard-card";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { UserBookings } from "@/components/user/user-bookings";
import { Grid } from "@mantine/core";
import { IconBed } from "@tabler/icons-react";
import React from "react";
import { useGetSettingsDashboard } from "@settings/_data";

export const SettingsDashboard = () => {
  const { data: settings, isPending } = useGetSettingsDashboard();

  if (isPending || !settings) return <DashboardLoader />;
  return (
    <Grid gutter="sm">
      <Grid.Col span={4}>
        <DashboardCard></DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard></DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard></DashboardCard>
      </Grid.Col>
      <Grid.Col span={8}>
        <DashboardCard
          title={`Unterkunftsbuchungen`}
          icon={<IconBed size={28} stroke={1.5} />}
        >
          <UserBookings bookings={settings.bookings} />
        </DashboardCard>
      </Grid.Col>
    </Grid>
  );
};

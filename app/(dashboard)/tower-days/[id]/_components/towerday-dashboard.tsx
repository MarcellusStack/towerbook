"use client";
import { DashboardCard } from "@/components/dashboard-card";
import { Grid, Progress, RingProgress, Text } from "@mantine/core";
import {
  IconBox,
  IconListCheck,
  IconProgressCheck,
  IconRun,
  IconWalk,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React from "react";

export const TowerdayDashboard = () => {
  const { id } = useParams();
  /* const { data: user, isPending } = useGetUserDashboard(id as string);

  if (isPending || !user) return <DashboardLoader />; */
  return (
    <Grid gutter="sm">
      <Grid.Col span={4}>
        <DashboardCard
          title="Aktuell im Dienst"
          icon={<IconRun size={28} stroke={1.5} />}
        >
          <Text>Mario Barwitsch</Text>
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard
          title="Aktuell in Bereitschaft"
          icon={<IconWalk size={28} stroke={1.5} />}
        >
          <Text>Marcel Pohl</Text>
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard
          title="Prozesse"
          icon={<IconProgressCheck size={28} stroke={1.5} />}
        >
          <Text>1 / 6</Text>
          <Progress value={54.31} size="md" color="yellow" radius="xl" />
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard
          title="Todos"
          icon={<IconListCheck size={28} stroke={1.5} />}
        >
          <Text>10 / 10</Text>
          <Progress value={100} size="md" color="green" radius="xl" />
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard
          title="Material Prüfung"
          icon={<IconBox size={28} stroke={1.5} />}
        >
          <Text>0 / 10</Text>
          <Progress value={0} size="md" color="blue" radius="xl" />
        </DashboardCard>
      </Grid.Col>
    </Grid>
  );
};

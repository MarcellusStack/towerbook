"use client";
import React from "react";
import { Grid, Text } from "@mantine/core";
import {
  IconBed,
  IconBuildingBroadcastTower,
  IconCalendar,
} from "@tabler/icons-react";
import FullCalendar from "@fullcalendar/react";
import deLocale from "@fullcalendar/core/locales/de";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { useParams } from "next/navigation";
import { useGetUserDashboard } from "@users/[id]/_data";
import { DashboardCard } from "@/components/dashboard-card";
import { UserUserBookings } from "@users/[id]/_components/user-user-bookings";

export const UserDashboard = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserDashboard(id as string);

  if (isPending || !user) return <DashboardLoader />;
  return (
    <Grid gutter="sm">
      <Grid.Col span={4}>
        <DashboardCard
          title="Turm Berechtigungen"
          icon={<IconBuildingBroadcastTower size={28} stroke={1.5} />}
        >
          <Text>Turm Berechtigungen</Text>
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard></DashboardCard>
      </Grid.Col>
      <Grid.Col span={4}>
        <DashboardCard></DashboardCard>
      </Grid.Col>
      <Grid.Col span={12}>
        <DashboardCard
          title="Wachplan"
          icon={<IconCalendar size={28} stroke={1.5} />}
        >
          <FullCalendar
            height={720}
            locales={[deLocale]}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={user.shifts.map((shift, index) => ({
              index: index,
              id: shift.id,

              /* title: `${shift.user.firstName} ${shift.user.lastName}`, */
              start: shift.startTime,
              end: shift.endTime,
              color: shift.type === "duty" ? "blue" : "gray",
            }))}
          />
        </DashboardCard>
      </Grid.Col>
      <Grid.Col span={12}>
        <DashboardCard
          title="Unterkunftsbuchungen"
          icon={<IconBed size={28} stroke={1.5} />}
        >
          <UserUserBookings bookings={user.bookings} />
        </DashboardCard>
      </Grid.Col>
    </Grid>
  );
};

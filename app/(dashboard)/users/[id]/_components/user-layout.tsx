"use client";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { Grid, GridCol, Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { useGetUserLayout } from "@users/[id]/_data";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconCalendar,
  IconFileCertificate,
  IconKey,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import { UserOverview } from "@users/[id]/_components/user-overview";

export const links = [
  {
    value: "/",
    icon: <IconLayoutDashboard size={16} stroke={1.5} />,
    label: "Übersicht",
  },
  {
    value: "account",
    icon: <IconUser size={16} stroke={1.5} />,
    label: "Stammdaten",
  },
  {
    value: "certificate",
    icon: <IconFileCertificate size={16} stroke={1.5} />,
    label: "Zertifikate",
  },
  {
    value: "permission",
    icon: <IconKey size={16} stroke={1.5} />,
    label: "Berechtigungen",
  },
  {
    value: "duty-plan",
    icon: <IconCalendar size={16} stroke={1.5} />,
    label: "Dienstplan",
  },
];

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserLayout(id as string);

  if (isPending || !user) return <SecondaryHeadingLoader />;
  return (
    <>
      <SecondaryAppHeading
        title={`Benutzer`}
        extraInfo={
          <Group gap="sm">
            <Text size="lg" c="dimmed">
              {user.firstName} {user.lastName}
            </Text>
          </Group>
        }
      />
      <SecondaryPageTabs page="users" links={links} />
      <Grid gutter="sm">
        <GridCol span={8}>{children}</GridCol>
        <GridCol span={4}>
          <UserOverview user={user} />
        </GridCol>
      </Grid>
    </>
  );
};

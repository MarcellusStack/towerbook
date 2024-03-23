"use client";
import React from "react";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import {
  Avatar,
  Card,
  Grid,
  GridCol,
  Group,
  ScrollArea,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useGetPermission } from "@permissions/[id]/_data";
import { PermissionOverview } from "@permissions/[id]/_components/permission-overview";
import { ViewActionIcon } from "@/components/view-action-icon";
import { QuickSearch } from "@/components/quick-search";

export const PermissionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useParams();
  const { data: permission, isPending } = useGetPermission(id as string);

  if (isPending || !permission) return <SecondaryHeadingLoader />;

  return (
    <>
      <SecondaryAppHeading
        title={`Berechtigung ${permission.name}`}
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              {permission.description}
            </Text>
          </Group>
        }
      />
      <Grid gutter="sm" style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>
          <Stack gap="sm">{children}</Stack>
        </GridCol>
        <GridCol span={4}>
          <Stack gap="sm">
            <PermissionOverview permission={permission} />
            <Stack gap="xs">
              <Text fw={700} size="xl">
                Benutzer
              </Text>
              <QuickSearch />
              <ScrollArea h={360}>
                <Stack gap="xs">
                  {permission.users.map((user) => (
                    <Card key={`${user.id}`} padding="xs" withBorder>
                      <Group justify="space-between">
                        <Avatar color="blue" radius="xl">
                          {user.firstName?.charAt(0)}
                          {user.lastName?.charAt(0)}
                        </Avatar>
                        <Group gap={rem(4)}>
                          <Text>{user.firstName}</Text>
                          <Text>{user.lastName}</Text>
                        </Group>
                        <ViewActionIcon href={`/users/${user.id}/permission`} />
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

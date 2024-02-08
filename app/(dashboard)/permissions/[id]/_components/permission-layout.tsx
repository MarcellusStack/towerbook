"use client";
import React from "react";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useGetPermission } from "@permissions/[id]/_data";
import { PermissionOverview } from "@permissions/[id]/_components/permission-overview";

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
      <Grid style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>
          <Stack gap="sm">{children}</Stack>
        </GridCol>
        <GridCol span={4}>
          <PermissionOverview permission={permission} />
        </GridCol>
      </Grid>
    </>
  );
};

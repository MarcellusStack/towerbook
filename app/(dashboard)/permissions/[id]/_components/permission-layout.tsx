"use client";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";

export const PermissionLayout = () => {
  const { id } = useParams();
  const { data: permission, isPending } = useGetPermissionLayout(id as string);

  if (isPending || !permission) return <SecondaryHeadingLoader />;

  return (
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
  );
};

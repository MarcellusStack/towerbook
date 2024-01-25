"use client";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { useGetUserLayout } from "@users/[id]/_data";

export const UserLayout = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserLayout(id as string);

  if (isPending || !user) return <SecondaryHeadingLoader />;
  return (
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
  );
};

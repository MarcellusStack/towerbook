"use client";
import { SecondaryHeadingLoader } from "@/components/loader/secondary-heading-loader";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { useGetTower } from "@data/tower";
import { Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";

export const TowerHeading = () => {
  const { id } = useParams();
  const { data: tower, isPending } = useGetTower(id as string);

  if (isPending || !tower) return <SecondaryHeadingLoader />;

  return (
    <SecondaryAppHeading
      title={`Turm ${tower.number}`}
      extraInfo={
        <Group>
          <Text size="lg" c="dimmed">
            {tower.name} {tower.location}
          </Text>
        </Group>
      }
    />
  );
};
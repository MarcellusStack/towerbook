"use client";
import React from "react";
import { towerStatus } from "@/constants";
import { Box, Stack } from "@mantine/core";

export const TowerStatus = ({ status }: { status: string }) => {
  let statusIcon;

  const statusObject = towerStatus.find((item) => item.value === status);

  switch (statusObject?.value) {
    case "lifeguard_on_duty":
      statusIcon = (
        <Stack gap={0}>
          <Box w={32} h={16} bg="red" />
          <Box w={32} h={16} bg="yellow" />
        </Stack>
      );
      break;
    case "use_caution_when_swimming":
      statusIcon = <Box w={32} h={32} bg="yellow" />;
      break;
    case "beach_closed":
      statusIcon = <Box w={32} h={32} bg="red" />;
      break;
  }

  return <>{statusIcon}</>;
};

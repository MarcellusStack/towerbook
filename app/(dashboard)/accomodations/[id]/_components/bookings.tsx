import { Stack, Text } from "@mantine/core";
import React from "react";

export const Bookings = () => {
  return (
    <Stack gap="sm">
      <Text fw={700} size="xl">
        Offene Buchungen
      </Text>

      <Text fw={700} size="xl">
        Bestätigte Buchungen
      </Text>
    </Stack>
  );
};

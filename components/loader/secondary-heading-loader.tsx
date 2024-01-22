import { Skeleton, Stack } from "@mantine/core";
import React from "react";

export const SecondaryHeadingLoader = () => {
  return (
    <Stack gap="xs">
      <Skeleton height={32} />
      <Skeleton height={24} />
    </Stack>
  );
};

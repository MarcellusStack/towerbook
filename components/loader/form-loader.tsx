import { Skeleton, Stack } from "@mantine/core";
import React from "react";

export const FormLoader = () => {
  return (
    <Stack gap="sm">
      <Skeleton height={512} />;
      <Skeleton height={64} />;
    </Stack>
  );
};

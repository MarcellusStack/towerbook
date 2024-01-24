import { Divider, Skeleton, Stack } from "@mantine/core";
import React from "react";
import { TableLoader } from "@components/loader/table-loader";

export const HeadingTableLoader = () => {
  return (
    <Stack gap="sm">
      <Skeleton height={32} />
      <Divider />
      <Skeleton height={36} />
      <TableLoader />
    </Stack>
  );
};

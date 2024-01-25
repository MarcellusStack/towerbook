import { SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

export const DashboardLoader = () => {
  return (
    <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
      {Array(12)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} height={256} />
        ))}
    </SimpleGrid>
  );
};

"use client";
import { TableLoader } from "@/components/loader/table-loader";
import { Grid, GridCol, Stack } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { useGetPermission } from "@permissions/[id]/_data";

export const Permission = () => {
  const { id } = useParams();
  const { data: permission, isPending } = useGetPermission(id as string);

  if (isPending || !permission) return <TableLoader />;
  return (
    <Grid>
      <GridCol span={8}></GridCol>
      <GridCol span={4}>
        <Stack pt="sm"></Stack>
      </GridCol>
    </Grid>
  );
};

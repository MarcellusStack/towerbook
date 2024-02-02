"use client";
import { TableLoader } from "@/components/loader/table-loader";
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  GridCol,
  Menu,
  Stack,
  Table,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { useGetPermission } from "@permissions/[id]/_data";
import { tableColumnProps } from "@/constants";
import { MantineTable } from "@/components/mantine-table";
import {
  IconBan,
  IconCheck,
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { PermissionTable } from "@permissions/[id]/_components/permission-table";

export const Permission = () => {
  const { id } = useParams();
  const { data: permission, isPending } = useGetPermission(id as string);

  if (isPending || !permission) return <TableLoader />;
  return (
    <Grid className="h-full">
      <GridCol span={8}>
        <Stack gap="sm">
          <PermissionTable permission={permission} />
          <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
            <Button variant="filled" type="submit" className="self-end">
              Speichern
            </Button>
          </Card>
        </Stack>
      </GridCol>
      <GridCol span={4}>
        <Stack gap="sm"></Stack>
      </GridCol>
    </Grid>
  );
};

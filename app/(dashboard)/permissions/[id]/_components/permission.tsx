"use client";
import { TableLoader } from "@/components/loader/table-loader";
import { Button, Card, Grid, GridCol, Stack, rem } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { useGetPermission } from "@permissions/[id]/_data";
import { PermissionForm } from "@/app/(dashboard)/permissions/[id]/_components/permission-form";

export const Permission = () => {
  const { id } = useParams();
  const { data: permission, isPending } = useGetPermission(id as string);

  if (isPending || !permission) return <TableLoader />;
  return (
    <>
      <PermissionForm permission={permission} />
    </>
  );
};

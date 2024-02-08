"use client";

import { useParams } from "next/navigation";
import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserPermissionForm } from "@users/[id]/permission/_components/user-permission-form";
import { useGetUserPermission } from "@users/[id]/permission/_data";

export const UserPermission = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserPermission(id as string);

  if (isPending || !user) return <FormLoader />;
  return <UserPermissionForm user={user} />;
};

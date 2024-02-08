"use client";

import { useParams } from "next/navigation";
import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserAccountForm } from "@users/[id]/account/_components/user-account-form";
import { useGetUserAccount } from "@users/[id]/account/_data";

export const UserAccount = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserAccount(id as string);

  if (isPending || !user) return <FormLoader />;
  return <UserAccountForm user={user} />;
};

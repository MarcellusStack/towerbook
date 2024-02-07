"use client";

import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserSettingsAccountForm } from "@settings/account/_components/user-settings-account-form";
import { useGetUserSettingsAccount } from "@settings/account/_data";

export const UserSettingsAccount = () => {
  const { data: user, isPending } = useGetUserSettingsAccount();

  if (isPending || !user) return <FormLoader />;
  return <UserSettingsAccountForm user={user} />;
};

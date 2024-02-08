"use client";
import { OrganizationSettingsForm } from "@/components/forms/organization-settings-form";
import { FormLoader } from "@/components/loader/form-loader";
import React from "react";
import { useGetOrganizationSettings } from "@settings/organization/data";

export const OrganizationSettings = () => {
  const { data: organization, isPending } = useGetOrganizationSettings();

  if (isPending || !organization) return <FormLoader />;
  return <OrganizationSettingsForm organization={organization} />;
};

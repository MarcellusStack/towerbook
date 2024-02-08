"use client";

import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserCertificateForm } from "@users/[id]/certificate/_components/user-certificate-form";
import { useGetUserSettingsCertificate } from "@settings/certificate/_data";

export const UserCertificate = () => {
  const { data: user, isPending } = useGetUserSettingsCertificate();

  if (isPending || !user) return <FormLoader />;
  return <UserCertificateForm user={user} />;
};

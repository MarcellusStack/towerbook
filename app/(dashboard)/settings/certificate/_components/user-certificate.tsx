"use client";

import { useParams } from "next/navigation";
import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserSettingsCertificateForm } from "@settings/certificate/_components/user-settings-certificate-form";
import { useGetUserCertificate } from "@users/[id]/certificate/_data";
import { useGetUserSettingsCertificate } from "@settings/certificate/_data";

export const UserCertificate = () => {
  const { data: user, isPending } = useGetUserSettingsCertificate();

  if (isPending || !user) return <FormLoader />;
  return <UserSettingsCertificateForm user={user} />;
};

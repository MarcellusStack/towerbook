"use client";

import { useParams } from "next/navigation";
import React from "react";
import { FormLoader } from "@/components/loader/form-loader";
import { UserCertificateForm } from "@users/[id]/certificate/_components/user-certificate-form";
import { useGetUserCertificate } from "@users/[id]/certificate/_data";

export const UserCertificate = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserCertificate(id as string);

  if (isPending || !user) return <FormLoader />;
  return <UserCertificateForm user={user} />;
};

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetTowerdayMaterial } from "@/data/towerdays";
import { FormLoader } from "@/components/loader/form-loader";

import { TowerdayMaterialForm } from "@components/towerdays/towerday/towerday-material-form";

export const TowerdayMaterial = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayMaterial(id as string);

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayMaterialForm towerday={towerday} />;
};

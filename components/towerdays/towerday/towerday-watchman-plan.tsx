"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetTowerdayWatchmanPlan } from "@/data/towerdays";
import { FormLoader } from "@/components/loader/form-loader";
import { TowerdayWatchmanPlanForm } from "@/components/towerdays/towerday/towerday-watchman-plan-form";

export const TowerdayWatchmanPlan = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayWatchmanPlan(
    id as string
  );

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayWatchmanPlanForm towerday={towerday} />;
};

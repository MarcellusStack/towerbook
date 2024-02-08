"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetTowerdayDutyPlan } from "@/data/towerdays";
import { FormLoader } from "@/components/loader/form-loader";
import { TowerdayDutyPlanForm } from "@components/towerdays/towerday/towerday-duty-plan-form";

export const TowerdayDutyPlan = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayDutyPlan(id as string);

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayDutyPlanForm towerday={towerday} />;
};

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetTowerdayIncident } from "@/data/towerdays";
import { FormLoader } from "@/components/loader/form-loader";
import { TowerdayIncidentForm } from "@components/towerdays/towerday/towerday-incident-form";

export const TowerdayIncident = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayIncident(id as string);

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayIncidentForm towerday={towerday} />;
};

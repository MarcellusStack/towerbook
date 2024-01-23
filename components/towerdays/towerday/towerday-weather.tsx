"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FormLoader } from "@/components/loader/form-loader";
import { useGetTowerdayWeather } from "@/data/towerdays";
import { TowerdayWeatherForm } from "@components/towerdays/towerday/towerday-weather-form";

export const TowerdayWeather = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayWeather(id as string);

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayWeatherForm towerday={towerday} />;
};

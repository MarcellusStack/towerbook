"use client";
import { MantineTable } from "@/components/mantine-table";
import { Fieldset, Stack, Text } from "@mantine/core";
import React from "react";
import { MaterialForm } from "@towers/[id]/settings/_components/material-form";
import { TodoForm } from "@towers/[id]/settings/_components/todo-form";
import { WeatherForm } from "@towers/[id]/settings/_components/weather-form";

export const TowerSettings = () => {
  return (
    <Stack gap="sm">
      <WeatherForm />
      <MaterialForm />
      <TodoForm />
    </Stack>
  );
};

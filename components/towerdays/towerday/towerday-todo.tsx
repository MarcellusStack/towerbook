"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetTowerdayTodo } from "@/data/towerdays";
import { FormLoader } from "@/components/loader/form-loader";
import { TowerdayTodoForm } from "@components/towerdays/towerday/towerday-todo-form";

export const TowerdayTodo = () => {
  const { id } = useParams();
  const { data: towerday, isPending } = useGetTowerdayTodo(id as string);

  if (isPending || !towerday) return <FormLoader />;

  return <TowerdayTodoForm towerday={towerday} />;
};

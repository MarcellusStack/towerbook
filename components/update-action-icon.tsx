"use client";
import { useActionNotification } from "@/hooks/use-action-notification";
import { ActionIcon, type ActionIconVariant } from "@mantine/core";
import React from "react";

export type UpdateActionIconProps = {
  icon: React.ReactNode;
  label: string;
  action: any;
  values: { [key: string]: any };
  variant?: ActionIconVariant;
};

export const UpdateActionIcon = ({
  icon,
  label,
  action,
  values,
  variant = "subtle",
}: UpdateActionIconProps) => {
  const { execute, status } = useActionNotification({
    action: action,
    executeNotification: `${label}`,
  });
  return (
    <ActionIcon
      color="blue"
      variant={variant}
      loading={status === "executing"}
      onClick={() => {
        execute({ ...values });
      }}
      aria-label={label}
    >
      {icon}
    </ActionIcon>
  );
};

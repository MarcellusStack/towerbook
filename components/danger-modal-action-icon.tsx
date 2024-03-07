"use client";
import { ActionIcon, Stack, type ActionIconVariant, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

export type DangerModalActionIconProps = {
  icon: React.ReactNode;
  label: string;
  action: React.ReactNode;
  variant?: ActionIconVariant;
};

export const DangerModalActionIcon = ({
  icon,
  label,
  action,
  variant = "subtle",
}: DangerModalActionIconProps) => {
  return (
    <ActionIcon
      color="red"
      variant={variant}
      onClick={() => {
        modals.open({
          title: `${label}`,
          children: (
            <>
              <Stack gap="sm">
                <Text size="sm">Diese Aktion ist unwiderruflich.</Text>
                {action}
              </Stack>
            </>
          ),
        });
      }}
      aria-label={label}
    >
      {icon}
    </ActionIcon>
  );
};

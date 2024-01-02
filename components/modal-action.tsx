"use client";
import { Button, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

export type ModalAction = {
  color: string;
  icon?: React.ReactNode;
  label: string;
  content: React.ReactNode;
  loading?:boolean;
};

export const ModalAction = ({ color, icon, label, content, loading }: ModalAction) => {
  return (
    <Button
      color={color}
      leftSection={icon}
      loading={loading}
      onClick={() => {
        modals.open({
          title: `${label}`,
          children: (
            <>
              <Stack gap="md">
                <Text size="sm">
                  Sind sie sicher, dass Sie diesen {label} wollen? Diese Aktion
                  ist unwiderruflich.
                </Text>
                {content}
              </Stack>
            </>
          ),
        });
      }}
    >
      {label}
    </Button>
  );
};

"use client";
import { Button, type ButtonProps, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

export type ButtonModalAction = ButtonProps & {
  content: React.ReactNode;
};

export const ButtonModalAction = ({ content, ...props }: ButtonModalAction) => {
  return (
    <Button
      {...props}
      onClick={() => {
        modals.open({
          title: `${props.children}`,
          children: (
            <>
              <Stack gap="md">
                <Text size="sm">
                  Überprüfen sie die folgende Aktion, ob sie diese wirklich
                  ausführen wollen.
                </Text>
                {content}
              </Stack>
            </>
          ),
        });
      }}
    >
      {props.children}
    </Button>
  );
};

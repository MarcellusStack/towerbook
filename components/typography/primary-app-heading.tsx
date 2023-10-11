import { Divider, Title } from "@mantine/core";
import React from "react";

export type PrimaryAppHeadingProps = { title: string };

export const PrimaryAppHeading = ({ title }: PrimaryAppHeadingProps) => {
  return (
    <>
      <Title order={1} size="h2" fw={700}>
        {title}
      </Title>
      <Divider />
    </>
  );
};

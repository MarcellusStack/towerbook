import { Divider, Group, Stack, Title, Text } from "@mantine/core";
import { IconSlash } from "@tabler/icons-react";
import React from "react";

export type SecondaryAppHeadingProps = {
  title: string;
  extraInfo: React.ReactNode;
};

export const SecondaryAppHeading = ({
  title,
  extraInfo,
}: SecondaryAppHeadingProps) => {
  return (
    <>
      <Stack gap="0">
        <Group gap="0">
          <Title order={1} size="h2" fw={700}>
            {title}
          </Title>
        </Group>
        {extraInfo}
      </Stack>
      <Divider />
    </>
  );
};

import { Divider, Group, Stack, Title, Text } from "@mantine/core";
import { IconSlash } from "@tabler/icons-react";
import React from "react";

export type SecondaryAppHeadingProps = {
  title: string;
  childName: string;
  extraInfo: React.ReactNode;
};

export const SecondaryAppHeading = ({
  title,
  childName,
  extraInfo,
}: SecondaryAppHeadingProps) => {
  return (
    <Stack gap="sm">
      <Group gap="0">
        <Title order={1} size="h2" fw={700}>
          {title}
        </Title>
        <IconSlash className="h-8 w-8" color="#000000" />
        <Text size="1.625rem" fw={700}>
          {childName}
        </Text>
      </Group>
      {extraInfo}
      {/* <Text size="lg" c="dimmed">
        {extraInfo}
      </Text> */}
      <Divider />
    </Stack>
  );
};

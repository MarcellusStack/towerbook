"use client";
import {
  UnstyledButton,
  Checkbox,
  Text,
  rem,
  Textarea,
  Card,
  SegmentedControl,
  Grid,
  ThemeIcon,
  Box,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export const CheckboxComment = ({ title }: { title: string }) => {
  const [value, setValue] = useState("unchecked");
  return (
    <Card p="sm" withBorder>
      <Grid gutter="md">
        <Grid.Col span={6}>
          <Text fw={500}>{title}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={500} mb={rem(2)}>
            Einsatzbereit
          </Text>
          <SegmentedControl
            value={value}
            onChange={setValue}
            fullWidth
            color="blue"
            data={[
              { value: "checked", label: "Ja" },
              { value: "unchecked", label: "Nein" },
            ]}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea placeholder="Bemerkungen" size="md" />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

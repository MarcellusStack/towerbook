"use client";

import {
  Card,
  Group,
  Stack,
  Text,
  List,
  ThemeIcon,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconMapPin,
  IconBed,
  IconHotelService,
  IconBookmark,
} from "@tabler/icons-react";
import React from "react";
import { type AccomodationProps } from "@services/accomodation/queries";

export const AccomodationOverview = ({
  accomodation,
}: {
  accomodation: AccomodationProps;
}) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Unterkunft
          </Text>
          <IconBed size={28} stroke={1.5} />
        </Group>
        <Divider />
        <List center spacing="sm">
          <List.Item
            icon={
              <ThemeIcon size="md" variant="light">
                <IconHotelService style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {accomodation.number} - {accomodation.name}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon size="md" variant="light">
                <IconMapPin style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {accomodation.street} {accomodation.zipCode} {accomodation.location}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon size="md" variant="light">
                <IconBookmark style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            <Badge color={accomodation.reservable ? "green" : "yellow"}>
              {accomodation.reservable ? "Reservierbar" : "Nicht reservierbar"}
            </Badge>
          </List.Item>
        </List>
      </Stack>
    </Card>
  );
};

"use client";
import {
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Text,
  List,
} from "@mantine/core";
import { IconBed, IconMapPin } from "@tabler/icons-react";
import React from "react";
import {
  type AccomodationProps,
  type AccomodationsProps,
} from "@services/accomodation/queries";
import Link from "next/link";

const Accomodation = ({ props }: { props: AccomodationsProps[0] }) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group>
          <ThemeIcon
            variant="light"
            size="xl"
            pos="relative"
            className="flex flex-col items-center"
          >
            <Text size="xs" fw={700} c="blue">
              {props.availableBeds}
            </Text>
            <IconBed style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
          <Text fw={700} size="xl">
            {props.number} - {props.name}
          </Text>
        </Group>
        <List center spacing="sm">
          <List.Item
            icon={
              <ThemeIcon size="md" variant="light">
                <IconMapPin style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {props.street} {props.zipCode} {props.location}
          </List.Item>
        </List>
      </Stack>
      <Card.Section>
        <Divider my="sm" />
      </Card.Section>
      <Button
        href={`/accomodations/${props.id}`}
        component={Link}
        variant="light"
        fullWidth
      >
        Buchen
      </Button>
    </Card>
  );
};

export const Accomodations = ({
  accomodations,
}: {
  accomodations: AccomodationsProps;
}) => {
  return (
    <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
      {accomodations.map((accomodation) => (
        <Accomodation key={accomodation.id} props={accomodation} />
      ))}
    </SimpleGrid>
  );
};

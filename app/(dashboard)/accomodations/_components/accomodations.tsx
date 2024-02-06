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
  Badge,
  Menu,
  ActionIcon,
} from "@mantine/core";
import {
  IconBed,
  IconBedOff,
  IconBookmark,
  IconDots,
  IconMapPin,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import Link from "next/link";
import {
  deleteAccomodation,
  disableAccomodation,
  enableAccomodation,
} from "@/server/actions/accomodation";
import { useActionNotification } from "@/hooks/use-action-notification";
import { TableLoader } from "@/components/loader/table-loader";
import { useGetAccomodations } from "@/app/(dashboard)/accomodations/_data";
import { type AccomodationsProps } from "@/app/(dashboard)/accomodations/_actions";
import { useSearchParams } from "next/navigation";

const Accomodation = ({ props }: { props: AccomodationsProps[0] }) => {
  const enable = useActionNotification({
    action: enableAccomodation,
    executeNotification: "Unterkunft wird freigegeben",
    hideModals: true,
  });
  const disable = useActionNotification({
    action: disableAccomodation,
    executeNotification: "Unterkunft wird gesperrt",
    hideModals: true,
  });

  const remove = useActionNotification({
    action: deleteAccomodation,
    executeNotification: "Unterkunft wird gelöscht",
    hideModals: true,
  });

  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group>
          <ThemeIcon variant="light" size="xl">
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
                <IconBookmark style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            <Badge color={props.reservable ? "green" : "red"}>
              {props.reservable ? "Reservierbar" : "Nicht reservierbar"}
            </Badge>
          </List.Item>

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
      <Group wrap="nowrap">
        <Button
          href={`/accomodations/${props.id}`}
          component={Link}
          variant="filled"
          fullWidth
        >
          Buchen
        </Button>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="light" size="lg" aria-label="Settings">
              <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Optionen</Menu.Label>
            {props.reservable ? (
              <Menu.Item
                disabled={disable.status === "executing"}
                onClick={() => {
                  disable.execute({ id: props.id });
                }}
                color="red"
                leftSection={
                  <ThemeIcon variant="white" bg="inherit" color="red">
                    <IconBedOff style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                Sperren
              </Menu.Item>
            ) : (
              <Menu.Item
                disabled={enable.status === "executing"}
                onClick={() => {
                  enable.execute({ id: props.id });
                }}
                color="green"
                leftSection={
                  <ThemeIcon variant="white" bg="inherit" color="green">
                    <IconBed style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                Freigeben
              </Menu.Item>
            )}
            <Menu.Item
              disabled={remove.status === "executing"}
              onClick={() => {
                remove.execute({ id: props.id });
              }}
              color="red"
              leftSection={
                <ThemeIcon variant="white" bg="inherit" color="red">
                  <IconTrash style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
              }
            >
              Löschen
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
};

export const Accomodations = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: accomodations, isPending } = useGetAccomodations(
    search as string
  );

  if (isPending || !accomodations) return <TableLoader />;
  return (
    <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
      {accomodations.map((accomodation) => (
        <Accomodation key={accomodation.id} props={accomodation} />
      ))}
    </SimpleGrid>
  );
};

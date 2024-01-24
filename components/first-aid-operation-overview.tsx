import { convertDate, convertTime } from "@/utils";
import {
  Card,
  Group,
  Stack,
  Text,
  List,
  ListItem,
  ThemeIcon,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconBuildingBroadcastTower,
  IconMapPin,
  IconCalendarEvent,
  IconClockSearch,
  IconUser,
  IconAmbulance,
  IconFirstAidKit,
  IconChartArcs,
  IconShieldChevron,
} from "@tabler/icons-react";
import React from "react";
import { status } from "@constants/index";

export const FirstAidOperationOverview = ({ operation }: { operation }) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            {operation.type === "big" ? "Großeinsatz" : "Einsatz"}
          </Text>
          {operation.type === "big" ? (
            <IconAmbulance size={28} stroke={1.5} />
          ) : (
            <IconFirstAidKit size={28} stroke={1.5} />
          )}
        </Group>
        <Divider />
        <List center spacing="sm">
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconChartArcs style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            <Badge color={status[operation.status].color}>
              {status[operation.status].label}
            </Badge>
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconCalendarEvent style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertDate(new Date(operation.date))}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconClockSearch style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertTime(new Date(operation.startTime))} -{" "}
            {operation.endTime && convertTime(new Date(operation.endTime))}
          </ListItem>
          {operation.firstName && operation.lastName && (
            <ListItem
              icon={
                <ThemeIcon variant="light">
                  <IconUser style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
              }
            >
              {operation.firstName} {operation.lastName}
            </ListItem>
          )}
          {operation.operationLocation && (
            <ListItem
              icon={
                <ThemeIcon size="md" variant="light">
                  <IconMapPin style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
              }
            >
              {operation.operationLocation}
            </ListItem>
          )}

          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconBuildingBroadcastTower
                  style={{ width: "70%", height: "70%" }}
                />
              </ThemeIcon>
            }
          >
            Turm {operation.tower.number} {operation.tower.location}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconShieldChevron style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {operation.guardLeader.firstName} {operation.guardLeader.lastName}
          </ListItem>
        </List>
      </Stack>
    </Card>
  );
};

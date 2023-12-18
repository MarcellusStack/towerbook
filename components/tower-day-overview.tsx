import { convertDate, convertTime } from "@/utils";
import {
  Avatar,
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
  IconBroadcast,
  IconBuildingBroadcastTower,
  IconMapPin,
  IconCalendarTime,
  IconShieldChevron,
  IconChartArcs,
  IconBadge,
} from "@tabler/icons-react";
import React from "react";
import { status } from "@/constants";

const TowerDayOverview = ({ towerday }) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Turm Tag
          </Text>
          <IconBroadcast size={28} stroke={1.5} />
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
            <Badge color={status[towerday.status].color}>
              {status[towerday.status].label}
            </Badge>
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconBuildingBroadcastTower
                  style={{ width: "70%", height: "70%" }}
                />
              </ThemeIcon>
            }
          >
            Turm {towerday.tower.name} {towerday.tower.number}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconShieldChevron style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {towerday.guardLeader.firstName} {towerday.guardLeader.lastName}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconBadge style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {towerday.towerLeader.firstName} {towerday.towerLeader.lastName}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconCalendarTime style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertDate(new Date(towerday.createdAt))}{" "}
            {convertTime(new Date(towerday.startedAt))}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon size="md" variant="light">
                <IconMapPin style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {towerday.tower.location}
          </ListItem>
        </List>
      </Stack>
    </Card>
  );
};

export default TowerDayOverview;

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
  IconCalendarEvent,
  IconClockSearch,
  IconUserSearch,
  IconChartArcs,
} from "@tabler/icons-react";
import React from "react";
import type { ExtendSearchListWithTowerProps } from "@server/queries/get-search-list";
import { status } from "@/constants";

export const SearchListOverview = ({
  searchlist,
}: {
  searchlist: ExtendSearchListWithTowerProps;
}) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Sucheintrag
          </Text>
          <IconUserSearch size={28} stroke={1.5} />
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
            <Badge color={status[searchlist.status].color}>
              {status[searchlist.status].label}
            </Badge>
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconCalendarEvent style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertDate(new Date(searchlist.date))}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconClockSearch style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertTime(new Date(searchlist.timeSearched))}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconUserSearch style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {searchlist.firstName} {searchlist.lastName}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconBuildingBroadcastTower
                  style={{ width: "70%", height: "70%" }}
                />
              </ThemeIcon>
            }
          >
            {searchlist.tower.name} {searchlist.tower.number}{" "}
            {searchlist.tower.location}
          </ListItem>
        </List>
      </Stack>
    </Card>
  );
};

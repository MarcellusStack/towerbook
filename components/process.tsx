import { Box, Divider, Group, ThemeIcon, Text, Anchor } from "@mantine/core";

import {
  IconCircleCheck,
  IconCircle,
  IconCircleDashed,
  IconCircleX,
} from "@tabler/icons-react";
import { type TowerDay, TowerDayFormStatus } from "@prisma/client";
import Link from "next/link";

export type ProcessProps = {
  process: TowerDayFormStatus;
  title: string;
  href: string;
};

const handleProcessColor = (process: TowerDayFormStatus) => {
  switch (process) {
    case "open":
      return "gray";
    case "ongoing":
      return "yellow";
    case "completed":
      return "green";
    case "incomplete":
      return "red";
    default:
      return "gray";
  }
};

export const Process = ({ process, title, href }: ProcessProps) => {
  return (
    <Anchor component={Link} href={href}>
      <Group gap="sm" wrap="nowrap" className="w-full">
        <Group wrap="nowrap">
          <ThemeIcon size="xl" color={handleProcessColor(process)}>
            {process === "open" && (
              <IconCircle
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            )}
            {process === "ongoing" && (
              <IconCircleDashed
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            )}
            {process === "completed" && (
              <IconCircleCheck
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            )}
            {process === "incomplete" && (
              <IconCircleX
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            )}
          </ThemeIcon>

          <Text size="md">{title}</Text>
        </Group>

        <Divider color="gray.3" size="sm" className="w-full" />
      </Group>
    </Anchor>
  );
};

export type TowerDayProcessProps = Pick<
  TowerDay,
  | "id"
  | "watchmanStatus"
  | "todoStatus"
  | "incidentStatus"
  | "weatherStatus"
  | "materialStatus"
  | "dutyplanStatus"
>;

export const TowerDayProcess = ({
  towerday,
}: {
  towerday: TowerDayProcessProps;
}) => {
  return (
    <Box style={{ position: "sticky", top: 0, left: 0, overflow: "auto" }}>
      <Group gap="sm" grow wrap="nowrap">
        <Process
          process={towerday.watchmanStatus}
          href={`/tower-days/${towerday.id}/watchman-plan`}
          title="Team"
        />
        <Process
          process={towerday.todoStatus}
          href={`/tower-days/${towerday.id}/todo`}
          title="Todo"
        />
        <Process
          process={towerday.incidentStatus}
          href={`/tower-days/${towerday.id}/incident`}
          title="Vorkommnisse"
        />
        <Process
          process={towerday.weatherStatus}
          href={`/tower-days/${towerday.id}/weather`}
          title="Wetter"
        />
        <Process
          process={towerday.materialStatus}
          href={`/tower-days/${towerday.id}/material`}
          title="Material Prüfung"
        />
        <Process
          process={towerday.dutyplanStatus}
          href={`/tower-days/${towerday.id}/duty-plan`}
          title="Wachplan"
        />
      </Group>
    </Box>
  );
};

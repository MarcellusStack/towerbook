"use client";

import {
  Box,
  Divider,
  Group,
  Text,
  Anchor,
  ActionIcon,
  Stack,
  Button,
} from "@mantine/core";

import {
  IconCircleCheck,
  IconCircle,
  IconCircleDashed,
  IconCircleX,
} from "@tabler/icons-react";
import { type TowerDay, type Status } from "@prisma/client";
import Link from "next/link";
import { modals } from "@mantine/modals";
import { useActionNotification } from "@/hooks/use-action-notification";
import { useParams } from "next/navigation";
import { resetTowerDayFormStatus } from "@server/actions/reset-tower-day-form-status";
import { usePermissions } from "@/stores/permissions";

export type ProcessProps = {
  process: Status;
  title: string;
  href: string;
  form:
    | "watchmanStatus"
    | "todoStatus"
    | "incidentStatus"
    | "weatherStatus"
    | "materialStatus"
    | "dutyplanStatus";
};

const handleProcessColor = (process: Status) => {
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

export const Process = ({ process, title, href, form }: ProcessProps) => {
  const { execute, status } = useActionNotification({
    action: resetTowerDayFormStatus,
    executeNotification: `Revision wird abgeschlossen`,
    hideModals: true,
  });
  const { permissions, hasAccess } = usePermissions("resetTowerdaySection");

  const { id } = useParams();
  return (
    <Group gap="sm" wrap="nowrap" className="w-full">
      <Group wrap="nowrap" gap="sm">
        <ActionIcon
          loading={status === "executing"}
          size="xl"
          color={handleProcessColor(process)}
          onClick={() => {
            if (!hasAccess) {
              return;
            }
            modals.open({
              title: `${title} in Bearbeitung setzen`,
              children: (
                <>
                  <Stack gap="md">
                    <Text size="sm">
                      Sind sie sicher, dass Sie diesen Prozess in Bearbeitung
                      setzen wollen? Diese Aktion ist unwiderruflich.
                    </Text>
                    <Button
                      variant="filled"
                      onClick={() => {
                        execute({ id: id, form: form });
                      }}
                    >
                      Prozess zurücksetzen
                    </Button>
                  </Stack>
                </>
              ),
            });
          }}
        >
          {process === "open" && <IconCircle stroke={1.5} />}
          {process === "ongoing" && <IconCircleDashed stroke={1.5} />}
          {process === "completed" && <IconCircleCheck stroke={1.5} />}
          {process === "incomplete" && (
            <IconCircleX style={{ width: "70%", height: "70%" }} stroke={1.5} />
          )}
        </ActionIcon>
        <Anchor component={Link} href={href}>
          <Text size="md">{title}</Text>
        </Anchor>
      </Group>
      <Divider color="gray.3" size="sm" className="w-full" />
    </Group>
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
          form="watchmanStatus"
        />
        <Process
          process={towerday.todoStatus}
          href={`/tower-days/${towerday.id}/todo`}
          title="Todo"
          form="todoStatus"
        />
        <Process
          process={towerday.incidentStatus}
          href={`/tower-days/${towerday.id}/incident`}
          title="Vorkommnisse"
          form="incidentStatus"
        />
        <Process
          process={towerday.weatherStatus}
          href={`/tower-days/${towerday.id}/weather`}
          title="Wetter"
          form="weatherStatus"
        />
        <Process
          process={towerday.materialStatus}
          href={`/tower-days/${towerday.id}/material`}
          title="Material Prüfung"
          form="materialStatus"
        />
        <Process
          process={towerday.dutyplanStatus}
          href={`/tower-days/${towerday.id}/duty-plan`}
          title="Wachplan"
          form="dutyplanStatus"
        />
      </Group>
    </Box>
  );
};

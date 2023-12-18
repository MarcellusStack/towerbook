import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { getTower } from "@/server/queries/get-tower";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconCheck,
  IconChecklist,
  IconLayoutDashboard,
  IconUserExclamation,
  IconDoorEnter,
} from "@tabler/icons-react";
import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { convertDate } from "@/utils";
import { TowerDayProcess } from "@/components/process";
import TowerDayOverview from "@/components/tower-day-overview";
import Link from "next/link";
import TowerDayAction from "@/components/tower-day-action";
import { OpenTowerDayAction } from "@/components/open-tower-day-action";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const towerday = await getTowerDayOverview(id, ["admin"]);

  return (
    <>
      <SecondaryAppHeading
        title="Turm Tag"
        extraInfo={
          <Text size="lg" c="dimmed">
            Turm {towerday.tower.number} {towerday.tower.location}{" "}
            {convertDate(new Date(towerday.createdAt))}
          </Text>
        }
      />

      <TowerDayProcess towerday={towerday} />

      <Grid>
        <GridCol span={8}>
          {towerday.status === "completed" && (
            <Alert
              variant="light"
              color="green"
              title="Turm-Tag abgeschlossen"
              icon={<IconCheck />}
            >
              Alle wichtigen Formulare wurden bearbeitet. Gut gemacht!
            </Alert>
          )}
          {towerday.status === "open" && <OpenTowerDayAction />}
          {towerday.status === "ongoing" && children}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm">
            <TowerDayOverview towerday={towerday} />
            <TowerDayAction />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}

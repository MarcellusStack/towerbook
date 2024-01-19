import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import {
  Alert,
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconLayoutDashboard,
  IconUserExclamation,
} from "@tabler/icons-react";
import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { convertDate } from "@/utils";
import { TowerDayProcess } from "@/components/process";
import TowerDayOverview from "@/components/tower-day-overview";
import Link from "next/link";
import { OpenTowerDayAction } from "@/components/open-tower-day-action";
import { completeTowerDay } from "@/server/actions/complete-tower-day";
import { CompleteAction } from "@/components/complete-action";
import { ModalAction } from "@/components/modal-action";
import { RevisionAction } from "@/components/revision-action";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const towerday = await getTowerDayOverview(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

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
          {(towerday.status === "ongoing" || towerday.status === "revision") &&
            children}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm">
            <TowerDayOverview towerday={towerday} />
            <Group>
              <Button
                leftSection={<IconLayoutDashboard />}
                component={Link}
                href={`/tower-days/${id}/`}
                variant="outline"
              >
                Übersicht
              </Button>
              {towerday.status === "revision" ? (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision aufheben"
                  content={
                    <RevisionAction modelType="towerday" type="complete" />
                  }
                />
              ) : (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision anfragen"
                  content={
                    <RevisionAction modelType="towerday" type="request" />
                  }
                />
              )}
              <CompleteAction label="Turmtag" action={completeTowerDay} />
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}

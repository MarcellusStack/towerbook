import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";
import {
  Alert,
  Badge,
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { getTower } from "@/server/queries/get-tower";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconCheck,
  IconChecklist,
  IconLayoutDashboard,
  IconUserExclamation,
} from "@tabler/icons-react";
import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { convertDate } from "@/utils";
import { TowerDayProcess } from "@/components/process";
import TowerDayOverview from "@/components/tower-day-overview";
import Link from "next/link";
import TowerDayAction from "@/components/tower-day-action";
import { getSearchList } from "@server/queries/get-search-list";
import { SearchListOverview } from "@/components/search-list-overview";
import { Suspense } from "react";
import { CompleteAction } from "@components/complete-action";
import { completeSearchList } from "@server/actions/complete-search-list";
import { status } from "@/constants";
import { FirstAidOperationOverview } from "@components/first-aid-operation-overview";
import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import { completeFirstAidOperation } from "@server/actions/complete-first-aid-operation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const operation = await getFirstAidOperation(id, ["admin"]);

  return (
    <>
      <SecondaryAppHeading
        title="Einsatz"
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              Turm {operation.tower.number}{" "}
            </Text>
            <Text size="lg" c="dimmed">
              {convertDate(new Date(operation.date))}
            </Text>
          </Group>
        }
      />
      <Grid>
        <GridCol span={8}>
          {operation.status === "completed" ? (
            <Alert
              variant="light"
              color="green"
              title="Einsatz abgeschlossen"
              icon={<IconCheck />}
            >
              Der Einsatz wurde beendet. Gut gemacht!
            </Alert>
          ) : (
            children
          )}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm">
            <FirstAidOperationOverview operation={operation} />
            <CompleteAction
              label="Einsatz"
              action={completeFirstAidOperation}
            />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}
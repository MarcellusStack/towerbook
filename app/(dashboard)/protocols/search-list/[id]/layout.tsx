import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";
import {
  Alert,
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

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const searchlist = await getSearchList(id, ["admin"]);

  return (
    <>
      <SecondaryAppHeading
        title="Suchliste"
        extraInfo={
          <Text size="lg" c="dimmed">
            {searchlist.firstName} {searchlist.lastName}{" "}
            {convertDate(new Date(searchlist.date))}
          </Text>
        }
      />
      <Grid style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>
          {searchlist.status === "completed" ? (
            <Alert
              variant="light"
              color="green"
              title="Suche abgeschlossen"
              icon={<IconCheck />}
            >
              Die Suche wurde übergeben. Gut gemacht!
            </Alert>
          ) : (
            children
          )}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm" style={{ position: "sticky", top: 0 }}>
            <SearchListOverview searchlist={searchlist} />
            <CompleteAction label="Sucheintrag" action={completeSearchList} />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}

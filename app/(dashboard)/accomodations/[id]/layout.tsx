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
import { FirstAidOperationOverview } from "@components/first-aid-operation-overview";
import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import { completeFirstAidOperation } from "@server/actions/complete-first-aid-operation";
import { ModalAction } from "@/components/modal-action";
import { RevisionAction } from "@/components/revision-action";
import { notFound } from "next/navigation";
import { AccomodationOverview } from "@/services/accomodation/components/accomodation-overview";
import { getAccomodation } from "@/services/accomodation/queries";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const accomodation = await getAccomodation(id, []);

  if (!accomodation) {
    notFound();
  }

  return (
    <>
      <SecondaryAppHeading
        title="Unterkunft"
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              {accomodation.number} - {accomodation.name}
            </Text>
          </Group>
        }
      />
      <Grid style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>{children}</GridCol>
        <GridCol span={4}>
          <Stack pt="sm" style={{ position: "sticky", top: 0 }}>
            <AccomodationOverview accomodation={accomodation} />
            {accomodation.reservable ? (
              <ModalAction
                color="red"
                icon={<IconUserExclamation />}
                label="Reservierungen sperren"
                content={null}
              />
            ) : (
              <ModalAction
                color="green"
                icon={<IconUserExclamation />}
                label="Reservierungen freigeben"
                content={null}
              />
            )}
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}

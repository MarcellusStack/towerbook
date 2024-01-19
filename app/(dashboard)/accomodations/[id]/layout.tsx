import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";

import { Grid, GridCol, Group, Stack, Text } from "@mantine/core";

import { IconBed, IconBedOff, IconUserExclamation } from "@tabler/icons-react";
import { ModalAction } from "@components/modal-action";
import { notFound } from "next/navigation";
import { AccomodationOverview } from "@/services/accomodation/components/accomodation-overview";
import { getAccomodation } from "@/services/accomodation/queries";
import {
  disableAccomodation,
  enableAccomodation,
} from "@/server/actions/accomodation";
import { EnableAccomodationAction } from "@/components/accomodation/enable-accomodation-action";
import { DisableAccomodationAction } from "@/components/accomodation/disable-accomodation-action";

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
                icon={<IconBedOff />}
                label="Unterkunft sperren"
                content={<DisableAccomodationAction />}
              />
            ) : (
              <ModalAction
                color="green"
                icon={<IconBed />}
                label="Unterkunft freigeben"
                content={<EnableAccomodationAction />}
              />
            )}
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}

"use client";
import React from "react";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";

import { Grid, GridCol, Group, Stack, Text } from "@mantine/core";

import { IconBed, IconBedOff } from "@tabler/icons-react";
import { ModalAction } from "@components/modal-action";
import { AccomodationOverview } from "@/services/accomodation/components/accomodation-overview";
import { EnableAccomodationAction } from "@/components/accomodation/enable-accomodation-action";
import { DisableAccomodationAction } from "@/components/accomodation/disable-accomodation-action";
import { useParams } from "next/navigation";
import { useGetAccomodation } from "@accomodations/[id]/_data";

import { LayoutLoader } from "@/components/loader/layout-loader";
import { Bookings } from "@accomodations/[id]/_components/bookings";

export const AccomodationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useParams();

  const { data: accomodation, isPending } = useGetAccomodation(id as string);

  if (isPending || !accomodation) return <LayoutLoader />;
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
            <Bookings />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

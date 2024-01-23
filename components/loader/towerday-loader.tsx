import React from "react";
import { SecondaryHeadingLoader } from "@components/loader/secondary-heading-loader";
import { Grid, GridCol, Skeleton, Stack } from "@mantine/core";

export const TowerdayLoader = () => {
  return (
    <>
      <SecondaryHeadingLoader />
      <Skeleton height={40} />
      <Grid>
        <GridCol span={8}>
          <Skeleton height={512} />
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm">
            <Skeleton height={256} />
            <Skeleton height={32} />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

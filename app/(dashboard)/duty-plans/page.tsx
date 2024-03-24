"use client";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowers } from "@/server/queries/tower";
import { CreateTowerForm } from "@/components/forms/create-tower-form";
import { TowerTable } from "@/components/tables/tower-table";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { QuickSearch } from "@/components/quick-search";
import FullCalendar from "@fullcalendar/react";
import deLocale from "@fullcalendar/core/locales/de";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  /* const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["towers", search],
    queryFn: async () => await getTowers(search),
    staleTime: 0,
  }); */

  return (
    <>
      <PrimaryAppHeading title="Monatsplan/Jahresplanung/Saisonplanung" />
      <QuickSearch />
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        height={720}
        locales={[deLocale]}
        plugins={[resourceTimelinePlugin]}
        initialView="resourceTimelineMonth"
        resourceAreaHeaderContent="Benutzer"
        events={[
          {
            index: 1,
            id: "5",
            resourceId: "a",
            title: `UK`,

            date: "2024-03-24",

            color: "gray",
          },
        ]}
        resources={[
          {
            id: "a",
            title: "John Brown",
          },
          {
            id: "b",
            title: "Andrew Thomas",
            eventColor: "green",
          },
          {
            id: "c",
            title: "Jane Jones",
            eventColor: "orange",
          },
          {
            id: "d",
            title: "Sophia Rodriguez",
          },
          {
            id: "e",
            title: "Isabella Smith",
          },
          {
            id: "f",
            title: "Matthew Rodriguez",
            eventColor: "red",
          },
          {
            id: "g",
            title: "Benjamin Wilson",
          },
          {
            id: "h",
            title: "Amelia Wilson",
          },
          {
            id: "i",
            title: "Andrew Martinez",
          },
          {
            id: "j",
            title: "Daniel Rodriguez",
          },
          {
            id: "k",
            title: "Isabella Wilson",
          },
          {
            id: "l",
            title: "James Jones",
          },
          {
            id: "m",
            title: "Olivia Miller",
          },
          {
            id: "n",
            title: "Jane Brown",
          },
          {
            id: "o",
            title: "Ava Miller",
          },
          {
            id: "p",
            title: "Emily Thompson",
          },
          {
            id: "q",
            title: "Daniel Davis",
          },
          {
            id: "r",
            title: "Ava Brown",
          },
          {
            id: "s",
            title: "Jane Thompson",
          },
          {
            id: "t",
            title: "David Martinez",
          },
          {
            id: "u",
            title: "Charlotte Jackson",
          },
          {
            id: "v",
            title: "Emma Brown",
          },
          {
            id: "w",
            title: "Ava Davis",
          },
          {
            id: "x",
            title: "Charlotte Smith",
          },
          {
            id: "y",
            title: "Benjamin Smith",
          },
          {
            id: "z",
            title: "Isabella Davis",
          },
        ]}
      />
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerTable />
      </HydrationBoundary> */}
    </>
  );
}

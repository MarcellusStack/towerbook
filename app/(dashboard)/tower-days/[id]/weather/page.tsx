import { getTowerDayWeather } from "@/server/queries/get-tower-day-weather";
import { TowerDayWeatherForm } from "@/components/forms/tower-day-weather-form";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { TowerdayWeather } from "@/components/towerdays/towerday/towerday-weather";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-weather", id],
    queryFn: async () => await getTowerDayWeather(id, []),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayWeather />
    </HydrationBoundary>
  );
}

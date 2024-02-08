import { notFound } from "next/navigation";
import { getTowerDayWatchmanPlan } from "@/server/queries/get-tower-day-watchman-plan";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TowerdayWatchmanPlan } from "@/components/towerdays/towerday/towerday-watchman-plan";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-watchman-plan", id],
    queryFn: async () => await getTowerDayWatchmanPlan(id),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayWatchmanPlan />
    </HydrationBoundary>
  );
}

import { notFound } from "next/navigation";
import { getTowerDayDutyPlan } from "@/server/queries/get-tower-day-duty-plan";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TowerdayDutyPlan } from "@/components/towerdays/towerday/towerday-duty-plan";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-duty-plan", id],
    queryFn: async () => await getTowerDayDutyPlan(id),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayDutyPlan />
    </HydrationBoundary>
  );
}

import { notFound } from "next/navigation";
import { getTowerDayIncident } from "@/server/queries/get-tower-day-incident";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TowerdayIncident } from "@/components/towerdays/towerday/towerday-incident";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-incident", id],
    queryFn: async () => await getTowerDayIncident(id, []),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayIncident />
    </HydrationBoundary>
  );
}

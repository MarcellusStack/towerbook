import { notFound } from "next/navigation";
import { getTowerDayMaterial } from "@/server/queries/get-tower-day-material";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TowerdayMaterial } from "@/components/towerdays/towerday/towerday-material";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-material", id],
    queryFn: async () => await getTowerDayMaterial(id, []),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayMaterial />
    </HydrationBoundary>
  );
}

import { notFound } from "next/navigation";
import { TowerDashboard } from "@/components/tower-dashboard";
import { getTowerOverview } from "@/server/queries/get-tower-overview";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const tower = await queryClient.fetchQuery({
    queryKey: ["tower-overview", id],
    queryFn: async () => await getTowerOverview(id, []),
    staleTime: 0,
  });

  if (!tower) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerDashboard />
    </HydrationBoundary>
  );
}

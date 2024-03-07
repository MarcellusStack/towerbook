import { notFound } from "next/navigation";
import { TowerDashboard } from "@/components/tower-dashboard";
import { getTower } from "@/server/queries/tower";
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
    queryKey: ["tower", id],
    queryFn: async () => await getTower(id),
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

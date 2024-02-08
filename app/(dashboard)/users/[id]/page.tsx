import { UserDashboard } from "@users/[id]/_components/user-dashboard";
import { getUserOverview } from "@/server/queries/get-user-overview";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-overview", id],
    queryFn: async () => await getUserOverview(id),
    staleTime: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDashboard />
    </HydrationBoundary>
  );
}

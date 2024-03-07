import { UserDashboard } from "@users/[id]/_components/user-dashboard";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserDashboard } from "@users/[id]/_actions";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-dashboard", id],
    queryFn: async () => await getUserDashboard(id),
    staleTime: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDashboard />
    </HydrationBoundary>
  );
}

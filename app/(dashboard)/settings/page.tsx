import { SettingsDashboard } from "@settings/_components/settings-dashboard";
import { getSettingsDashboard } from "@settings/_actions";
import { queryClient } from "@/server/lib/utils/query-client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page() {
  
  await queryClient.prefetchQuery({
    queryKey: ["settings-dashboard"],
    queryFn: async () => await getSettingsDashboard(),
    staleTime: 0,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsDashboard />
    </HydrationBoundary>
  );
}

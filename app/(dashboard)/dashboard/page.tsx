import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { notFound } from "next/navigation";
import { getUserDashboard } from "./_actions";
import { Dashboard } from "./_components/dashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => await getUserDashboard(),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <PrimaryAppHeading title="Dashboard" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>
    </>
  );
}

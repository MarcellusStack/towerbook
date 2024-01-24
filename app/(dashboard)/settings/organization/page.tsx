import { getOrganizationSettings } from "@server/queries/organization";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { OrganizationSettings } from "@settings/organization/_components/organization-settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = new QueryClient();

  const organization = await queryClient.fetchQuery({
    queryKey: ["organization"],
    queryFn: async () => await getOrganizationSettings(),
    staleTime: 0,
  });

  if (!organization) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationSettings />;
    </HydrationBoundary>
  );
}

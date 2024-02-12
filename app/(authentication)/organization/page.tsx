import { Title, Text } from "@mantine/core";
import { JoinOrganization } from "@organization/_components/join-organization";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getInvitations } from "@organization/_actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invitations"],
    queryFn: async () => await getInvitations(),
    staleTime: 0,
  });
  return (
    <>
      <Title order={1} size="h2">
        Organisation
      </Title>
      <Text c="dimmed" size="sm">
        Erstellen oder treten Sie einer Organisation bei.
      </Text>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JoinOrganization />
      </HydrationBoundary>
    </>
  );
}

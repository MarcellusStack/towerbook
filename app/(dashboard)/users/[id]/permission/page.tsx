import { notFound } from "next/navigation";
import { getUserPermission } from "@users/[id]/permission/_actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserPermission } from "@users/[id]/permission/_components/user-permission";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-permission", id],
    queryFn: async () => await getUserPermission(id),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserPermission />
    </HydrationBoundary>
  );
}

import { notFound } from "next/navigation";

import { getPermission } from "@permissions/[id]/_actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Permission } from "@permissions/[id]/_components/permission";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const permission = await queryClient.fetchQuery({
    queryKey: ["permission", id],
    queryFn: async () => await getPermission(id),
    staleTime: 0,
  });

  if (!permission) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Permission />
    </HydrationBoundary>
  );
}

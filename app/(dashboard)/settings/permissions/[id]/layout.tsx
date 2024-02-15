import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { PermissionLayout } from "@permissions/[id]/_components/permission-layout";
import { getPermission } from "@permissions/[id]/_actions";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
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
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PermissionLayout>{children}</PermissionLayout>
      </HydrationBoundary>
    </>
  );
}

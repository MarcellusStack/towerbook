import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { FirstAidOperation } from "@/components/protocols/first-aid-operation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["first-aid-operation", id],
    queryFn: async () => await getFirstAidOperation(id, []),
    staleTime: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FirstAidOperation>{children}</FirstAidOperation>
      </HydrationBoundary>
    </>
  );
}

import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { FirstAidOperation } from "@/components/protocols/first-aid-operation";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const operation = await queryClient.fetchQuery({
    queryKey: ["first-aid-operation", id],
    queryFn: async () => await getFirstAidOperation(id, []),
    staleTime: 0,
  });

  if (!operation) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FirstAidOperation>{children}</FirstAidOperation>
      </HydrationBoundary>
    </>
  );
}

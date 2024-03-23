import { getSearchList } from "@server/queries/get-search-list";
import { notFound } from "next/navigation";
import { SearchListLayout } from "@search-list/[id]/_components/search-list-layout";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const searchlist = await queryClient.fetchQuery({
    queryKey: ["searchlist", id],
    queryFn: async () => await getSearchList(id),
    staleTime: 0,
  });

  if (!searchlist) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchListLayout>{children}</SearchListLayout>
      </HydrationBoundary>
    </>
  );
}

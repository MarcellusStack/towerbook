import { notFound } from "next/navigation";
import { getSearchList } from "@server/queries/get-search-list";
import { TableOfContents } from "@components/table-of-contents";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { SearchList } from "@search-list/[id]/_components/search-list";

export const dynamic = "force-dynamic";

const links = [
  { label: "Gesuchte Person", link: "#wanted-person" },
  { label: "Meldende Person", link: "#reporting-person" },
  { label: "Zuletzt gesehen", link: "#last-seen" },
  { label: "Maßnahmen", link: "#measures" },
  { label: "Ergebnis", link: "#result" },
];

export default async function Page({ params }: { params: { id: string } }) {
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
        <SearchList />
      </HydrationBoundary>
      <TableOfContents links={links} />
    </>
  );
}

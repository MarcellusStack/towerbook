import { notFound } from "next/navigation";
import { getSearchList } from "@server/queries/get-search-list";
import { SearchListForm } from "@components/forms/search-list-form";
import { TableOfContents } from "@components/table-of-contents";

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
  const searchlist = await getSearchList(id, ["admin"]);

  if (!searchlist) {
    notFound();
  }
  return (
    <>
      <SearchListForm searchlist={searchlist} />
      <TableOfContents links={links} />
    </>
  );
}

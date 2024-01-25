import { getUserAccount } from "@users/[id]/account/_actions";
import { TableOfContents } from "@/components/table-of-contents";
import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserAccount } from "@users/[id]/account/_components/user-account";

export const dynamic = "force-dynamic";

const links = [
  { label: "Stammdaten", link: "#base-data" },
  { label: "Notfallkontakt", link: "#emergency-contact" },
  { label: "Bankverbindung", link: "#bank-details" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-account", id],
    queryFn: async () => await getUserAccount(id, []),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserAccount />
      </HydrationBoundary>
      <TableOfContents links={links} />
    </>
  );
}

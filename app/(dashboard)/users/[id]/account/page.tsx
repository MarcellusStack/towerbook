import { UserAccountForm } from "@components/forms/user-account-form";
import { getUserAccount } from "@server/queries/get-user-account";
import { TableOfContents } from "@/components/table-of-contents";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const links = [
  { label: "Stammdaten", link: "#base-data" },
  { label: "Notfallkontakt", link: "#emergency-contact" },
  { label: "Bankverbindung", link: "#bank-details" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserAccount(id, ["admin"]);

  if (!user) {
    notFound();
  }

  return (
    <>
      <UserAccountForm user={user} />
      <TableOfContents links={links} />
    </>
  );
}

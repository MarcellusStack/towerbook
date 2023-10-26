import { UserAccountForm } from "@components/forms/user-account-form";
import { getUserAccount } from "@server/queries/get-user-account";
import { TableOfContents } from "@/components/table-of-contents";

export const dynamic = "force-dynamic";

const links = [
  { label: "Stammdaten", link: "#base-data" },
  { label: "Notfallkontakt", link: "#emergency-contact" },
  { label: "Bankverbindung", link: "#bank-details" },
];

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = await getUserAccount(userId, ["admin"]);

  return (
    <>
      <UserAccountForm user={user} />
      <TableOfContents links={links} />
    </>
  );
}

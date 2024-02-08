import { TableOfContents } from "@/components/table-of-contents";
import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserSettingsAccount } from "@settings/account/_actions";
import { UserSettingsAccount } from "@settings/account/_components/user-settings-account";
import { userLinks } from "@/constants";

export const dynamic = "force-dynamic";



export default async function Page() {
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-settings-account"],
    queryFn: async () => await getUserSettingsAccount(),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserSettingsAccount />
      </HydrationBoundary>
      <TableOfContents links={userLinks} />
    </>
  );
}

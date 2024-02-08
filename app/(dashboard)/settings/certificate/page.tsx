import { TableOfContents } from "@/components/table-of-contents";
import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserCertificate } from "@users/[id]/certificate/_components/user-certificate";
import { userCertificateLinks } from "@/constants";
import { getUserSettingsCertificate } from "@settings/certificate/_actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-settings-certificate"],
    queryFn: async () => await getUserSettingsCertificate(),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserCertificate />
      </HydrationBoundary>
      <TableOfContents links={userCertificateLinks} />
    </>
  );
}

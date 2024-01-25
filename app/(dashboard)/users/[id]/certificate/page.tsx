import { UserCertificateForm } from "@components/forms/user-certificate-form";
import { getUserCertificate } from "@server/queries/get-user-certificate";
import { TableOfContents } from "@/components/table-of-contents";
import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserCertificate } from "@users/[id]/certificate/_components/user-certificate";

export const dynamic = "force-dynamic";

const links = [
  { label: "Schwimmen", link: "#swim" },
  { label: "Medizinisch", link: "#medical" },
  { label: "Führungsausbildung", link: "#leadership-training" },
  { label: "Fahrzeug-Qualifikation", link: "#vehicle-qualification" },
  { label: "Funkzeugnisse", link: "#radio-certificate" },
  { label: "Sonstige Qualifikationen", link: "#other-qualification" },
  { label: "Ausbilder Qualifikation", link: "#instructor-qualification" },
  { label: "Unterweisungen", link: "#instructions" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-certificate", id],
    queryFn: async () => await getUserCertificate(id, []),
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
      <TableOfContents links={links} />
    </>
  );
}

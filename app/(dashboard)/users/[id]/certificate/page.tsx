import { Grid, GridCol, Box } from "@mantine/core";
import { UserCertificateForm } from "@components/forms/user-certificate-form";
import { getUserCertificate } from "@server/queries/get-user-certificate";
import { TableOfContents } from "@/components/table-of-contents";

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
  const user = await getUserCertificate(id, ["admin"]);

  return (
    <>
      <UserCertificateForm user={user} />
      <TableOfContents links={links} />
    </>
  );
}

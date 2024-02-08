import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { Protocols } from "@/components/protocols";
import { protocolLinks } from "@constants/protocol-links";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <PrimaryAppHeading title="Protokolle" />
      <Protocols protocols={protocolLinks} />
    </>
  );
}

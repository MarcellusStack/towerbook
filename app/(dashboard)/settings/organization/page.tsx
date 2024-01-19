import { OrganizationSettingsForm } from "@/components/forms/organization-settings-form";
import { getOrganizationSettings } from "@server/queries/organization";

export const dynamic = "force-dynamic";

export default async function Page() {
  const organization = await getOrganizationSettings();

  return <OrganizationSettingsForm organization={organization} />;
}

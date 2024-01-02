import { OrganizationSettingsForm } from "@/components/forms/organization-settings-form";
import {
  Title,
  Text,
  Button,
  AppShell,
  Burger,
  Group,
  Skeleton,
  Anchor,
  Center,
  Loader,
  Tabs,
  Badge,
  SimpleGrid,
} from "@mantine/core";

import { getOrganizationSettings } from "@server/queries/organization";

export const dynamic = "force-dynamic";

export default async function Page() {
  const organization = await getOrganizationSettings();

  return <OrganizationSettingsForm organization={organization} />;
}

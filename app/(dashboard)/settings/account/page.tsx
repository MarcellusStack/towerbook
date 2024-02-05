import { UserSettingsForm } from "@/components/forms/user-settings-form";
import { getUserSettings } from "@/server/queries/user";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUserSettings();
  return <UserSettingsForm user={user} />;
}

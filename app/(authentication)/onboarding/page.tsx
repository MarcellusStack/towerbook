import { Title, Text } from "@mantine/core";
import { Onboarding } from "@/app/(authentication)/onboarding/_components/onboarding";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        Benutzer Onboarding
      </Title>
      <Text c="dimmed" size="sm">
        Erzählen Sie uns etwas über sich
      </Text>
      <Onboarding />
    </>
  );
}

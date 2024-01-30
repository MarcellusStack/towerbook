import { Title, Text } from "@mantine/core";
import { JoinOrganization } from "@organization/_components/join-organization";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        Organisation
      </Title>
      <Text c="dimmed" size="sm">
        Erstellen oder treten Sie einer Organisation bei.
      </Text>
      <JoinOrganization />
    </>
  );
}

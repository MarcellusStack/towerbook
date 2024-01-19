import { Title, Text } from "@mantine/core";

import { VerifyEmail } from "@/components/verify-email";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        E-Mail bestätigen
      </Title>
      <Text c="dimmed" size="sm">
        Bitte bestätigen Sie Ihre E-Mail Adresse um sich anzumelden
      </Text>
      <VerifyEmail />
    </>
  );
}

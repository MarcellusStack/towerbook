import { Title, Text } from "@mantine/core";
import SignInForm from "@/components/forms/sign-in-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        Willkommen zurück
      </Title>
      <Text c="dimmed" size="sm">
        Bitte geben sie Ihre Daten ein
      </Text>
      <SignInForm />
    </>
  );
}

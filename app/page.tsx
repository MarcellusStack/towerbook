import { AuthLayout } from "@/components/layouts/auth-layout";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";

export default async function Index() {
  return (
    <AuthLayout>
      <Title order={1} size="h2">
        Digitales Turmbuch
      </Title>
      <Text c="dimmed" size="sm">
        Ihre zuverlässige Begleitung im Rettungsturm. Verwalten Sie mühelos
        Aufzeichnungen und Informationen mit der Digitales Turmbuch App.
        Optimieren Sie Ihre Arbeitsabläufe und bleiben Sie organisiert.
      </Text>
      <Button component={Link} href="/sign-in">
        Jetzt Starten
      </Button>
    </AuthLayout>
  );
}

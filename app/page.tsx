import { AuthLayout } from "@/components/layouts/auth-layout";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";
import { ButtonLink } from "@/components/button-link";

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
      <ButtonLink title="Jetzt Starten" href="/sign-in" />
    </AuthLayout>
  );
}

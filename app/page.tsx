import { AuthLayout } from "@/components/layouts/auth-layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";
import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@server/lib/auth-options";
import { redirect } from "next/navigation";

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
      <Button component={Link} href="/sign-up">
        Jetzt Starten
      </Button>
      <LogoutButton />
    </AuthLayout>
  );
}

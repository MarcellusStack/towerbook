import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";

import { redirect } from "next/navigation";
import { getUser } from "@server/lib/utils/get-user";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <Title order={1} size="h2">
        Passwort vergessen
      </Title>
      <Text c="dimmed" size="sm">
        Wenn sie Ihr Passwort vergessen haben, geben sie Ihre E-Mail ein und wir
        senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
      </Text>
      <ForgotPasswordForm />
    </>
  );
}
